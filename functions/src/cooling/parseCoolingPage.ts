import { Page } from 'puppeteer';
import { Cooling } from '../../../types';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import { xPathSelectors } from '../common/constants';
import getParsingElement from '../common/getParsingElement';
import parseElementText from '../common/parseElementText';
import parsePrices from '../common/parsePrices';
import parseElementInnerHTML from '../common/parseElementInnerHTML';

const parseCoolingPage = async (
  productId: string,
  page: Page,
): Promise<Cooling | null> => {
  const description = await parseElementInnerHTML('.desc-ai-title', page);

  // console.log(description);

  await page.waitForXPath(xPathSelectors.specificationButton);
  const anchor = (await page.$x(xPathSelectors.specificationButton)) as any;
  await Promise.all([
    await anchor[0].click(),
    await page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  const name = await parseElementText('.op1-tt', page);

  // console.log(name);

  const brand = await parseElementText('.path_lnk_brand', page);

  // console.log(brand);

  const mainImageContainer = await getParsingElement('.img200', page);

  const mainImage = await page.evaluate(
    (el) => el.lastElementChild.getAttribute('src').split(' ')[0],
    mainImageContainer,
  );

  // console.log(mainImage);

  const specsTable = await getParsingElement('#help_table', page);

  const rawSpecsTable = await page.evaluate(async (node) => {
    async function getNodeTreeText(
      inputNode: HTMLElement,
    ): Promise<string | null> {
      if (inputNode && inputNode.hasChildNodes()) {
        return node.innerText;
      }

      return null;
    }
    return getNodeTreeText(node);
  }, specsTable);

  // console.log(rawSpecsTable);

  if (!name || !mainImage || !rawSpecsTable || !brand) return null;

  const cleanedSpecsTable = cleanComplexTable(rawSpecsTable);

  // console.log(cleanedSpecsTable);

  const specs: Record<string, string> = {};

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');
    if (!name || !value) return;

    const camelName = camelize(name);

    specs[camelName] = removeNonBreakingSpace(value);
  });

  const sockets = specs.socket?.split(',');

  console.log(specs);

  await page.waitForXPath(xPathSelectors.pricesButton);
  const pricePageAnchor = (await page.$x(xPathSelectors.pricesButton)) as any;
  await Promise.all([
    await pricePageAnchor[0].click(),
    await page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  const price = await parsePrices(page);

  return price
    ? {
        id: productId,
        name,
        mainImage,
        price,
        brand,
        description: description || undefined,
        officialWebsite: specs?.officialWebsite,
        target: specs?.features,
        type: specs?.productType,
        fans: specs?.numberOfFans,
        heatPipes: specs?.heatPipes,
        heatPipeContact: specs?.heatpipeContact,
        heatSinkMaterial: specs?.heatsinkMaterial,
        plateMaterial: specs?.plateMaterial,
        mountType: specs?.mountType,
        socket: sockets,
        fanSize: specs?.fanSize,
        bearing: specs?.bearing,
        minRPM: specs?.minRPM,
        maxRPM: specs?.maxRPM,
        speedController: specs?.speedController,
        maxAirFlow: specs?.maxAirFlow,
        maxTDP: specs?.maxTDP,
        airFlowDirection: specs?.airFlowDirection,
        replaceable: !specs?.replaceable,
        staticPressure: specs?.staticPressure,
        lighting: !specs?.lighting,
        lightingColour: specs?.lightingColour,
        powerSource: specs?.powerSource,
        minNoiseLevel: specs?.minNoiseLevel,
        noiseLevel: specs?.noiseLevel,
        dimensions: specs?.dimensions,
        height: specs?.height,
        weight: specs?.weight,
      }
    : null;
};

export default parseCoolingPage;
