import { Page } from 'puppeteer';
import parseElementText from '../common/parseElementText';
import { SolidStateDrive } from '../../../types';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import camelize from '../common/camelize';
import cleanSimpleTable from '../common/cleanSimpleTable';
import cleanComplexTable from '../common/cleanComplexTable';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import parsePrices from '../common/parsePrices';

const parseSolidStateDrivePage = async (
  productId: string,
  page: Page,
): Promise<SolidStateDrive | null> => {
  const name = await parseElementText('.op1-tt', page);

  const brand = await parseElementText('.path_lnk_brand', page);

  const mainImageContainer = await getParsingElement('.img200', page);
  const mainImage = await page.evaluate(
    (el) => el.lastElementChild.getAttribute('src').split(' ')[0],
    mainImageContainer,
  );

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

  if (!name || !mainImage || !rawSpecsTable || !brand) return null;

  const isTableSimple = !!(await page.$('.one-col'));

  const cleanedSpecsTable = isTableSimple
    ? cleanSimpleTable(rawSpecsTable)
    : cleanComplexTable(rawSpecsTable);

  const specs: Record<string, string> = {};

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');

    if (!name && !value) {
      return;
    }

    const camelName = camelize(name);
    specs.hasOwnProperty(camelName)
      ? (specs[`${camelName}Dimensions`] = removeNonBreakingSpace(value))
      : (specs[camelName] = removeNonBreakingSpace(value));
  });

  console.log(specs);

  const price = await parsePrices(page);

  return price
    ? {
        id: productId,
        name,
        mainImage,
        price,
        brand,
        description: description || undefined,
        placement: specs?.placement,
        capacity: specs?.size,
        formFactor: specs?.formFactor,
        m2Interface: specs?.m2Interface,
        interface: specs?.interface,
        controller: specs?.controller,
        cacheMemory: specs?.cacheMemory,
        memoryType: specs?.memoryType,
        nVMe: specs?.nVMe,
        material: specs?.material,
        writeSpeed: specs?.writeSpeed,
        readSpeed: specs?.readSpeed,
        writeIOPS: specs?.writeIOPS,
        readIOPS: specs?.readIOPS,
        TBW: specs?.TBW,
        MTBF: specs?.MTBF,
        trim: !!!specs?.TRIM,
        size: specs?.sizeDimensions,
        weight: specs?.weight,
      }
    : null;
};

export default parseSolidStateDrivePage;
