import { Page } from 'puppeteer';
import { Case } from '../../../types';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import { regexes, xPathSelectors } from '../common/constants';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import parseElementText from '../common/parseElementText';
import parseColorDivs from '../common/parseColorDivs';
import parsePrices from '../common/parsePrices';

const parseCasePage = async (
  productId: string,
  page: Page,
): Promise<Case | null> => {
  const descriptionText = await parseElementText('.desc-ai-title', page);

  const description =
    descriptionText && (await parseElementInnerHTML('.desc-ai-title', page));

  await page.waitForXPath(xPathSelectors.specificationButton);
  const anchor = (await page.$x(xPathSelectors.specificationButton)) as any;
  await Promise.all([
    await anchor[0].click(),
    await page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  const name = await parseElementText('.op1-tt', page);

  if (!name) return null;

  const brand = await parseElementText('.path_lnk_brand', page);

  if (!brand) return null;

  const mainImageContainer = await getParsingElement('.img200', page);
  const mainImage = await page.evaluate(
    (el) => el.lastElementChild.getAttribute('src').split(' ')[0],
    mainImageContainer,
  );

  if (!mainImage) return null;

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

  if (!rawSpecsTable) return null;

  const booleanValues = await page.evaluate(() => {
    const classNamePattern = /prop-/i;
    return [...document.querySelectorAll('img')]
      .filter((element) => classNamePattern.test(element.className))
      .map((element) => element.className === 'prop-y');
  });

  const cleanedSpecsTable = cleanComplexTable(rawSpecsTable);

  const rawSpecs: Record<string, string> = {};

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');

    if (!name && !value) {
      return;
    }

    const camelName = camelize(name);
    rawSpecs.hasOwnProperty(camelName)
      ? (rawSpecs[`${camelName}Internal`] = removeNonBreakingSpace(value))
      : (rawSpecs[camelName] = removeNonBreakingSpace(value));
  });

  const colourArray = await parseColorDivs(xPathSelectors.caseColourDivs, page);

  if (colourArray) rawSpecs.colour = colourArray.join();

  const fansSizes = Object.keys(rawSpecs)
    .filter((key) => regexes.fansInCase.test(key))
    .map((key) => ({ [key]: rawSpecs[key] }));

  const liquidFansSizes = Object.keys(rawSpecs)
    .filter((key) => regexes.liquidFansInCase.test(key))
    .map((key) => ({ [key]: rawSpecs[key] }));

  const normalizedSpecs = Object.entries(rawSpecs).map(([key, value]) =>
    key !== 'colour' && !value ? [key, booleanValues.shift()] : [key, value],
  );

  const specs = Object.fromEntries(normalizedSpecs);

  const price = await parsePrices(page);

  if (specs?.PSU) return null;

  if (!price) return null;

  return {
    id: productId,
    name,
    mainImage,
    brand,
    description: description || undefined,
    price,
    officialWebsite: specs?.officialWebsite,
    colour: specs?.colour,
    target: specs?.features,
    mount: specs?.mount,
    fanMaxHeight: specs?.fanMaxHeight,
    caseFormFactor: specs?.formFactor,
    formFactor: specs?.motherboardSupport,
    psuFormFactor: specs?.pSUFormFactor.split(' ')[0],
    boardPlacement: specs?.boardPlacement,
    psuMaxLength: specs?.pSUMaxLength,
    gpuMaxLength: specs?.graphicsCardMaxLenght,
    rubberFeet: specs?.rubberFeet,
    psuMount: specs?.pSUMount,
    dimensions: specs?.['dimensions(HxWxD)'],
    expansionSlots: specs?.expansionSlots,
    openMechanism: specs?.openMechanism,
    fansTotal: specs?.fansTotal,
    fansInfo: fansSizes,
    fansMountTotal: specs?.fanMountsTotal,
    gridFrontPanel: specs?.gridFrontPanel,
    dustFilter: specs?.dustFilter,
    liquidCoolingSupport: specs?.liquidCoolingSupport,
    liquidPlacement: specs?.placement,
    liquidCoolingMountsTotal: specs?.liquidCoolingMounts,
    liquidCoolingInfo: liquidFansSizes,
    usb32Gen1: specs?.uSB32Gen1,
    usb32Gen2: specs?.uSB32Gen2,
    usbc32Gen2: specs?.uSBC32Gen2,
    usb20: specs?.['USB 2.0'],
    audioPort: specs['audio(Microphoneheadphones)'],
    material: specs?.material,
    bays35: specs?.['35"Bays'],
    internal25Compartments: specs?.['internal25"Compartments'],
    frontPanel: specs?.frontPanel,
    weight: specs?.weight,
  };
};

export default parseCasePage;
