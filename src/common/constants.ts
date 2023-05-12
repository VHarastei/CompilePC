import { FunctionComponent, SVGProps } from 'react';
import {
  CaseIcon,
  CoolingIcon,
  CPUIcon,
  GPUIcon,
  HDDIcon,
  MotherboardIcon,
  PSUIcon,
  RAMIcon,
  SSDIcon,
} from '../components/Icons';

const DEFAULT_REGION = 'europe-central2';

const DEFAULT_PAGE_SIZE = 10;

const IconByCategory: {
  [key in keyof typeof ProductCategories]: FunctionComponent<
    SVGProps<SVGSVGElement>
  >;
} = {
  CPU: CPUIcon,
  GPU: GPUIcon,
  RAM: RAMIcon,
  SSD: SSDIcon,
  HDD: HDDIcon,
  cooling: CoolingIcon,
  case: CaseIcon,
  motherboard: MotherboardIcon,
  PSU: PSUIcon,
};

const ProductCategories = {
  CPU: {
    categoryName: 'CPU',
    builderTitle: 'CPU',
    collectionName: 'CPUs',
  },
  GPU: {
    categoryName: 'GPU',
    builderTitle: 'Graphic card',
    collectionName: 'graphicsCards',
  },
  PSU: {
    categoryName: 'PSU',
    builderTitle: 'Power suply unit',
    collectionName: 'PSUs',
  },
  RAM: {
    categoryName: 'RAM',
    builderTitle: 'RAM',
    collectionName: 'RAM',
  },
  case: {
    categoryName: 'case',
    builderTitle: 'Case',
    collectionName: 'cases',
  },
  cooling: {
    categoryName: 'cooling',
    builderTitle: 'Cooling',
    collectionName: 'coolings',
  },
  motherboard: {
    categoryName: 'motherboard',
    builderTitle: 'Motherboard',
    collectionName: 'motherboards',
  },
  SSD: {
    categoryName: 'SSD',
    builderTitle: 'SSD',
    collectionName: 'solidStateDrives',
  },
  HDD: {
    categoryName: 'HDD',
    builderTitle: 'HDD',
    collectionName: 'hardDrives',
  },
} as const;

const ProductPageTabs = [
  { value: '', label: 'Overview' },
  { value: 'stores', label: 'Stores' },
];

const ROUTES = {
  PRODUCT: '/product/:category/:id/',
  ASSEMBLY: '/assembly/:id',
};

const NUMERIC_FORMAT = /^[0-9]*$/;

const MIN_PRICE_SLIDER_DISTANCE = 1000;
// eslint-disable-next-line import/prefer-default-export

const emptyState = {
  CPU: null,
  GPU: null,
  PSU: null,
  RAM: null,
  case: null,
  cooling: null,
  motherboard: null,
  SSD: null,
  HDD: null,
};

const emptyComparisonState = {
  CPU: [],
  GPU: [],
  PSU: [],
  RAM: [],
  case: [],
  cooling: [],
  motherboard: [],
  SSD: [],
  HDD: [],
};

export {
  DEFAULT_REGION,
  IconByCategory,
  ProductCategories,
  ProductPageTabs,
  MIN_PRICE_SLIDER_DISTANCE,
  NUMERIC_FORMAT,
  ROUTES,
  DEFAULT_PAGE_SIZE,
  emptyState,
  emptyComparisonState,
};
