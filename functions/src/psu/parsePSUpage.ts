import { Page } from 'puppeteer';
import { PSU } from '../../../types';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import parseElementText from '../common/parseElementText';
import cleanSimpleTable from '../common/cleanSimpleTable';
import parsePrices from '../common/parsePrices';

const parsePSUpage = async (
  productId: string,
  page: Page,
): Promise<PSU | null> => {
  const descriptionText = await parseElementText('.conf-desc-ai-title', page);

  const description =
    descriptionText &&
    (await parseElementInnerHTML('.conf-desc-ai-title', page));

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

  const isTableSimple = !!(await page.$('.one-col'));

  const cleanedSpecsTable = isTableSimple
    ? cleanSimpleTable(rawSpecsTable)
    : cleanComplexTable(rawSpecsTable);

  const specs: Record<string, string> = {};

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');
    if (!name || !value) return;

    const camelName = camelize(name);

    if (specs.hasOwnProperty(camelName)) {
      specs[`${camelName}CableLength`] = removeNonBreakingSpace(value);
    } else specs[camelName] = removeNonBreakingSpace(value);
  });

  const price = await parsePrices(page);

  if (!price) return null;

  return {
    id: productId,
    name,
    mainImage,
    price,
    brand,
    description: description || undefined,
    officialWebsite: specs?.officialWebsite,
    power: parseInt(specs?.power),
    psuFormFactor: specs?.formFactor,
    PFC: specs?.PFC,
    efficiency: specs?.efficiency,
    coolingSystem: specs?.coolingSystem,
    fanSize: specs?.fanSize,
    fanBearings: specs?.fanBearing,
    certification: specs?.certification,
    atx12vVersion: specs?.aTX12VVersion,
    powerSupply: specs?.mBCPUPowerSupply,
    SATA: specs?.SATA,
    MOLEX: specs?.MOLEX,
    PCIE8pin: specs['pCIE8pin(6+2)'],
    PCIE16pin: specs?.pCIE16pin,
    cableSystem: specs?.cableSystem,
    braidedWires: !specs?.braidedWires,
    mbCableLength: specs?.MB,
    cpuCableLength: specs?.CPU,
    sataCableLength: specs?.SATACableLength,
    molexCableLength: specs?.MOLEXCableLength,
    PCIECableLength: specs?.['PCI-E'],
    dimensions: specs?.['dimensions(HxWxD)'],
    weight: specs?.weight,
  };
};

export default parsePSUpage;
