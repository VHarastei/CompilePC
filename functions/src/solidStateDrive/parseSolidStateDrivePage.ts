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
import { ssdRegex } from '../common/constants';

const parseSolidStateDrivePage = async (
  productId: string,
  page: Page,
): Promise<SolidStateDrive | null> => {
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

  const price = await parsePrices(page);

  if (!price) return null;

  if (specs?.placement === 'external') return null;

  if (!specs?.interface && !specs?.m2Interface) return null;

  let ssdInterf =
    specs?.m2Interface && specs?.m2Interface.match(ssdRegex)
      ? 'PCI-E 4x'
      : specs.interface;

  return {
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
    ssdInterface: ssdInterf,
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
  };
};

export default parseSolidStateDrivePage;
