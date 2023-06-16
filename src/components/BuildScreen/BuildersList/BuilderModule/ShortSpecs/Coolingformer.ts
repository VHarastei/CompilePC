import { Cooling, ShortSpec } from '../../../../../../types/index';

const Coolingformer = (product: Cooling): ShortSpec[] => [
  { name: 'Type', value: `${product.type}, ${product.target}` },
  {
    name: 'Socket',
    value: product.socket && product.socket.join(', '),
  },
  { name: 'TDP', value: product.maxTDP },
  { name: 'Fan', value: `${product.fanSize}, ${product.maxRPM}` },
  { name: 'Height', value: product.height },
];

export default Coolingformer;
