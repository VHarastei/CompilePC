import { CPU, ShortSpec } from '../../../../../../types/index';

const CPUformer = (product: CPU): ShortSpec[] => [
  { name: 'Series', value: product.series },
  { name: 'Socket', value: product.socket },
  { name: 'Threads', value: product.threads },
];

export default CPUformer;
