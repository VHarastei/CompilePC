import { Motherboard, ShortSpec } from '../../../../../../types/index';

const Motherboardformer = (product: Motherboard): ShortSpec[] => [
  { name: 'Form Factor', value: product.formFactor },
  { name: 'Socket', value: product.socket },
  { name: 'Chipset', value: product.chipset },
  { name: 'Max clock frequency', value: product.maxClockFrequency },
];

export default Motherboardformer;
