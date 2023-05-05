import { CPU } from './../../../types/index';
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
import parseCPUPage from '../cpu/parseCPUPage';

puppeteer.use(StealthPlugin());

const runtimeOpts = {
  timeoutSeconds: 540,
};

const testCategory = functions
  .region(DEFAULT_REGION)
  .runWith(runtimeOpts)
  .https.onRequest(async () => {
    try {
      const options: any = {
        headless: true,
        args: ['--lang=en-US'],
        ignoreHTTPSErrors: true,
      };

      const db = await getDB();

      const categoriesCursor = db.collection(CATEGORIES_COLLECTION_NAME).find();
      const categories = await categoriesCursor.toArray();

      const category = categories[0]; // choose your category by index; add it beforehand in firebase console, if it does not exist
      if (!category) return;

      const browser = await puppeteer.launch(options);
      const page = await browser.newPage();
      await page.goto(`${EKATALOG_LIST_LINK}${category.ekatalog_id}`, {
        waitUntil: ['networkidle2', 'domcontentloaded'],
      });
      await page.waitForSelector("[data-lang='en']");
      await page.click("[data-lang='en']");
      await page.waitForTimeout(5000);

      const n = 5; // Set the maximum number of pages
      let loadMoreButton = await page.$x(xPathSelectors.loadMoreButton);
      let clickCount = 0;

      while (loadMoreButton[0] && clickCount < n) {
        await page.evaluate((button: any) => button.click(), loadMoreButton[0]);
        await page.waitForTimeout(2000);
        loadMoreButton = await page.$x(xPathSelectors.loadMoreButton);
        clickCount++;
      }

      const productLinks = await page.evaluate(async () =>
        Array.from(document.querySelectorAll('.model-short-title'), (a) =>
          a.getAttribute('href'),
        ),
      );

      const products: CPU[] = []; // put your component type here

      let productCount = 1;

      await Promise.map(
        productLinks as string[],
        async (link: string) => {
          if (!link) return;

          const productPage = await browser.newPage();
          await productPage.goto(`${EKATALOG_LINK}${link}`, {
            waitUntil: ['networkidle2', 'domcontentloaded'],
          });

          const productId = link.replace(regexes.cleanLinkForProductId, '');

          if (!productId) return;

          const parser = parseCPUPage; // put YOUR parser here
          if (!parser) return;

          const product = await parser(productId, productPage);
          if (!product) return;

          console.log(productCount++);

          const normalizedProduct = Object.fromEntries(
            Object.entries(product).filter(([, value]) => value),
          ) as CPU; // put your component type here as well

          console.log(normalizedProduct);

          products.push(normalizedProduct);
        },
        { concurrency: 10 },
      );

      const categoryCollectionRef = db.collection(category.name);
      const bulk = categoryCollectionRef.initializeUnorderedBulkOp();

      await categoryCollectionRef.deleteMany({});
      products.forEach((product) => {
        bulk.insert(product);
      });
      await bulk.execute();
      await browser.close();
      console.log('finish');
    } catch (err) {
      console.log(err);
    }
    return;
  });

export default testCategory;
