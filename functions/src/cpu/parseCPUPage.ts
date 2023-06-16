import { Page } from 'puppeteer';
import parseElementText from '../common/parseElementText';
import { CPU } from '../../../types';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import parsePrices from '../common/parsePrices';
import { ramTypes } from '../common/constants';

const parseCPUPage = async (
  productId: string,
  page: Page,
): Promise<CPU | null> => {
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

  const cleanedSpecsTable = cleanComplexTable(rawSpecsTable);

  const specs: Record<string, string> = {};

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');
    if (!name || !value) return;

    const camelName = camelize(name);

    specs[camelName] = removeNonBreakingSpace(value);
  });

  const RAMType = ramTypes.filter((ramType) =>
    Object.keys(specs).join('').includes(ramType),
  );

  if (!RAMType.length) return null;

  const price = await parsePrices(page);

  if (!price) return null;

  return {
    id: productId,
    name,
    mainImage,
    brand,
    description: description || undefined,
    price,
    officialWebsite: specs?.officialWebsite,
    manufacturer: specs?.manufacturer,
    series: specs?.series,
    codeName: specs?.codeName,
    socket: specs?.socket,
    lithography: specs?.lithography,
    cores: specs?.cores,
    threads: specs?.threads,
    clockSpeed: specs?.clockSpeed,
    turboBoost: specs?.turboBoostTurboCore,
    l1Cache: specs?.totalL1Cache,
    l2Cache: specs?.totalL2Cache,
    l3Cache: specs?.totalL2Cache,
    IGP: specs?.IGP,
    TDP: specs?.TDP,
    PCIExpress: specs?.pCIExpress,
    maxOperatingTemperature: specs?.maxOperatingTemperature,
    maxDDR3Speed: specs?.maxDDR3Speed,
    maxDDR4Speed: specs?.maxDDR4Speed,
    maxDDR5Speed: specs?.maxDDR5Speed,
    channels: specs?.channels,
    ramType: RAMType,
  };
};

export default parseCPUPage;
