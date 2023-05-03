import { SolidStateDrive, ShortSpec } from '../../../../../../types/index';

const SSDformer = (product: SolidStateDrive): ShortSpec[] => [
  { name: 'Capacity', value: product.capacity },
  {
    name: 'Format',
    value: product.formFactor,
  },
  {
    name: 'NAND',
    value: product.memoryType,
  },
  {
    name: 'Record',
    value: product.writeSpeed,
  },
  {
    name: 'Reading',
    value: product.readSpeed,
  },
];

export default SSDformer;
