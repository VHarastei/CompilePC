import { SolidStateDrive } from '../../../types';
import puppeteer from 'puppeteer-extra';
import * as functions from 'firebase-functions';
import { Promise } from 'bluebird';

import {
  CATEGORIES_COLLECTION_NAME,
  DEFAULT_REGION,
  EKATALOG_LINK,
  EKATALOG_LIST_LINK,
  regexes,
  xPathSelectors,
} from '../common/constants';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { getDB } from '../bootstrap';
import parseSolidStateDrivePage from '../solidStateDrive/parseSolidStateDrivePage';

puppeteer.use(StealthPlugin());

type props = {
  timeoutSeconds: number;
  memory:
    | '128MB'
    | '256MB'
    | '512MB'
    | '1GB'
    | '2GB'
    | '4GB'
    | '8GB'
    | undefined;
};

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: '8GB',
};

const testCategory = functions
  .region(DEFAULT_REGION)
  .runWith(runtimeOpts as props)
  .https.onRequest(async () => {
    try {
      const options: any = {
        headless: true,
        args: ['--lang=en-US'],
        ignoreHTTPSErrors: true,
      };

      console.time('Time this');

      const db = await getDB();

      const categoriesCursor = db.collection(CATEGORIES_COLLECTION_NAME).find();
      const categories = await categoriesCursor.toArray();

      const category = categories[5]; // choose your category by index; add it beforehand in firebase console, if it does not exist
      if (!category) return;

      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();
      await page.goto(`${EKATALOG_LIST_LINK}${category.ekatalog_id}`, {
        waitUntil: ['networkidle2', 'domcontentloaded'],
      });
      await page.waitForSelector("[data-lang='en']");
      await page.click("[data-lang='en']");
      await page.waitForTimeout(7500);

      const n = 6; // Set the maximum number of pages

      let loadMoreButton = await page.$x(xPathSelectors.loadMoreButton);
      let clickCount = 0;

      while (loadMoreButton[0] && clickCount < n) {
        await page.evaluate((button: any) => button.click(), loadMoreButton[0]);
        await page.waitForTimeout(2500);
        loadMoreButton = await page.$x(xPathSelectors.loadMoreButton);
        clickCount++;
      }

      const productLinks = await page.evaluate(async () =>
        Array.from(document.querySelectorAll('.model-short-title'), (a) =>
          a.getAttribute('href'),
        ),
      );

      const products: SolidStateDrive[] = []; // put your component type here

      console.log('Links', productLinks.length);

      // concurrent

      await Promise.map(
        productLinks as string[],
        async (link: string) => {
          if (!link) return;
          const productPage = await browser.newPage();
          await productPage.goto(`${EKATALOG_LINK}${link}`, {
            waitUntil: ['networkidle2', 'domcontentloaded'],
          });
          const productId = link.replace(regexes.cleanLinkForProductId, '');

          const parser = parseSolidStateDrivePage; // put YOUR parser here
          if (!parser) return;

          const product = await parser(productId, productPage);
          if (!product) return;

          const normalizedProduct = Object.fromEntries(
            Object.entries(product).filter(([, value]) => value),
          ) as SolidStateDrive; // put your component type here as well

          // console.log(normalizedProduct);

          products.push(normalizedProduct);
        },
        { concurrency: 6 },
      );

      // parallel

      // await Promise.all(
      //   (productLinks as string[]).map(async (link: string) => {
      //     if (!link) return;

      //     const productPage = await browser.newPage();
      //     await productPage.goto(`${EKATALOG_LINK}${link}`, {
      //       waitUntil: ['networkidle2', 'domcontentloaded'],
      //     });

      //     const productId = link.replace(regexes.cleanLinkForProductId, '');

      //     const parser = parseCPUPage; // put YOUR parser here
      //     if (!parser) return;

      //     const product = await parser(productId, productPage);
      //     if (!product) return;

      //     const normalizedProduct = Object.fromEntries(
      //       Object.entries(product).filter(([, value]) => value),
      //     ) as CPU; // put your component type here as well

      //     products.push(normalizedProduct);
      //   }),
      // );

      console.log('Products', products.length);

      const categoryCollectionRef = db.collection(category.name);
      const bulk = categoryCollectionRef.initializeUnorderedBulkOp();

      await categoryCollectionRef.deleteMany({});
      products.forEach((product) => {
        bulk.insert(product);
      });
      await bulk.execute();
      await browser.close();

      console.log('finish');
      console.timeEnd('Time this');
    } catch (err) {
      console.log(err);
    }
    return;
  });

export default testCategory;
