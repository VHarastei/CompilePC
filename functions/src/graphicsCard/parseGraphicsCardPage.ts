import { Page } from 'puppeteer';
import parseElementText from '../common/parseElementText';
import { GraphicsCard } from '../../../types';
import getParsingElement from '../common/getParsingElement';
import parseElementInnerHTML from '../common/parseElementInnerHTML';
import camelize from '../common/camelize';
import cleanComplexTable from '../common/cleanComplexTable';
import { removeNonBreakingSpace } from '../common/removeNonBreakingSpace';
import parsePrices from '../common/parsePrices';

const parseGraphicsCardPage = async (
  productId: string,
  page: Page,
): Promise<GraphicsCard | null> => {
  const name = await parseElementText('.op1-tt', page);

  if (!name) return null;

  const vendor = await parseElementText('.path_lnk_brand', page);

  if (!vendor) return null;

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

    if (!name && !value) {
      return;
    }

    const camelName = camelize(name);

    specs[camelName] = removeNonBreakingSpace(value);
  });

  const brand = specs.gPUModel.split(' ')[0];

  const price = await parsePrices(page);

  if (!price) return null;

  if (!specs.minimumPSURecommendation) return null;

  if (!specs.interface) return null;

  return {
    id: productId,
    name,
    mainImage,
    price,
    brand,
    vendor,
    description: description || undefined,
    interface: specs?.interface,
    GPUModel: specs?.gPUModel,
    architecture: specs?.architecture,
    memorySize: specs?.memorySize,
    memoryType: specs?.memoryType,
    memoryBus: specs?.memoryBus,
    GPUClockSpeed: specs?.gPUClockSpeed,
    lithography: specs?.lithography,
    maxResolution: specs?.maxResolution,
    HDMI: specs?.HDMI,
    HDMIVersion: specs?.hDMIVersion,
    displayPort: specs?.displayPort,
    displayPortVersion: specs?.displayPortVersion,
    directX: specs?.directX,
    openGL: specs?.openGL,
    isVRReady: !!!specs?.VR,
    streamProcessors: specs?.streamProcessors,
    textureUnits: specs?.textureUnits,
    monitorsConnection: specs?.monitorsConnection,
    cooling: specs?.cooling,
    fans: specs?.fans,
    additionalPower: specs?.additionalPower,
    power: parseInt(specs?.minimumPSURecommendation),
    numberOfSlots: specs?.numberOfSlots,
    // taken from e-katalog: Length	200 mm / 200x123x38 /
    size: specs?.length,
  };
};

export default parseGraphicsCardPage;
