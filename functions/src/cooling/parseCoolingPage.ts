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

  const cleanedSpecsTable = cleanComplexTable(rawSpecsTable);

  const specs: Record<string, string> = {};

  cleanedSpecsTable.forEach((item: string) => {
    const [name, value] = item.split('\t');
    if (!name || !value) return;

    const camelName = camelize(name);

    specs[camelName] = removeNonBreakingSpace(value);
  });

  let sockets = specs.socket?.split(',');

  if (!sockets) return null;

  const normalizeSocket = (socket: string) =>
    socket.includes(' / ') ? socket.replace(' / ', '/') : socket;

  const normalizeVersion = (sockets: string[]) => {
    // only if sockets has one item like "v1" / "v2"

    let check = sockets.find((socket: string) => socket.includes('v'));

    if (check) {
      let index = sockets.indexOf(check);

      sockets.splice(index - 1, 2, `${sockets[index - 1]} ${check}`);
    }

    return sockets;
  };

  const normalizedSockets = sockets.map((socket) => {
    return normalizeSocket(socket)
      .trim()
      .split(' ')
      .map((socket) => {
        if (socket.includes('/')) {
          let socketArr: string[] = socket.split('/');
          return socketArr;
        }
        return socket;
      })
      .flat(1);
  });

  const normalizedVersionSockets = normalizedSockets.map((socket) =>
    normalizeVersion(socket),
  );

  const completeSockets = normalizedVersionSockets
    .map((socketArr) => {
      let socketName = socketArr[0];

      let socket = socketArr.reduce((acc: string[], curr, index) => {
        if (!index) return acc;

        acc.push(
          socketName === 'Intel'
            ? socketName + ' ' + 'LGA ' + curr
            : socketName + ' ' + curr,
        );
        return acc;
      }, []);

      return socket;
    })
    .flat(1);

  await page.waitForXPath(xPathSelectors.pricesButton);
  const pricePageAnchor = (await page.$x(xPathSelectors.pricesButton)) as any;
  await Promise.all([
    await pricePageAnchor[0].click(),
    await page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

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
    target: specs?.features,
    type: specs?.productType,
    fans: specs?.numberOfFans,
    heatPipes: specs?.heatPipes,
    heatPipeContact: specs?.heatpipeContact,
    heatSinkMaterial: specs?.heatsinkMaterial,
    plateMaterial: specs?.plateMaterial,
    mountType: specs?.mountType,
    socket: completeSockets,
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
  };
};

export default parseCoolingPage;
