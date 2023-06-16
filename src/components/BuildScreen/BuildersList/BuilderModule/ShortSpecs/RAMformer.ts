import { RAM, ShortSpec } from '../../../../../../types/index';

const RAMformer = (product: RAM): ShortSpec[] => [
  { name: 'Capacity', value: product.capacity },
  { name: 'Type', value: product.ramType },
  { name: 'Frequency', value: product.speed },
];

export default RAMformer;
