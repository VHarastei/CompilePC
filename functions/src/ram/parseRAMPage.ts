import { Page } from 'puppeteer';
import parseElementText from '../common/parseElementText';
import { RAM } from '../../../types';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import camelize from '../common/camelize';
import { xPathSelectors } from '../common/constants';
import parseColorDivs from '../common/parseColorDivs';
import cleanSimpleTable from '../common/cleanSimpleTable';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import parsePrices from '../common/parsePrices';

const parseRAMPage = async (
  productId: string,
  page: Page,
): Promise<RAM | null> => {
  const specs: Record<string, string> = {};

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

  const descriptionText = await parseElementText('.conf-desc-ai-title', page);

  const description =
    descriptionText &&
    (await parseElementInnerHTML('.conf-desc-ai-title', page));

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

  const cleanedSpecsTable = cleanSimpleTable(rawSpecsTable);

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');

    if (!name && !value) {
      return;
    }

    const camelName = camelize(name);

    specs[camelName] = removeNonBreakingSpace(value);
  });

  const colourArray = await parseColorDivs(xPathSelectors.ramColourDivs, page);

  if (colourArray) specs.colour = colourArray.join();

  if (!specs) return null;

  const price = await parsePrices(page);

  if (!price) return null;

  return {
    id: productId,
    name,
    mainImage,
    price,
    brand,
    description: description || undefined,
    colour: specs?.colour,
    capacity: specs?.memoryCapacity,
    modules: specs?.memoryModules,
    formFactor: specs?.formFactor,
    ramType: specs?.type,
    speed: specs?.memorySpeed,
    clockSpeed: specs?.clockSpeed,
    casLatency: specs?.cASLatency,
    timing: specs?.memoryTiming,
    voltage: specs?.voltage,
    cooling: specs?.cooling,
    moduleProfile: specs?.moduleProfile,
    moduleHeight: specs?.moduleHeight,
  };
};

export default parseRAMPage;
