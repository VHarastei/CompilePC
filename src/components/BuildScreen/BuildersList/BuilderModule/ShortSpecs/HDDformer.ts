import { HardDrive, ShortSpec } from '../../../../../../types/index';

const HDDformer = (product: HardDrive): ShortSpec[] => [
  { name: 'Type', value: product.type },
  { name: 'Capacity', value: product.capacity },
  {
    name: 'Format',
    value: product.formFactor,
  },
  {
    name: 'Revolutions',
    value: product.RPM,
  },
];

export default HDDformer;
