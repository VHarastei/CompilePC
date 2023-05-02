import { PSU, ShortSpec } from '../../../../../../types/index';

const PSUformer = (product: PSU): ShortSpec[] => [
  { name: 'Power', value: product.power },
  { name: 'Form Factor', value: product.formFactor },
  {
    name: 'Power supply',
    value: product.powerSupply,
  },
  {
    name: 'Connectors',
    value: `SATA ${product.SATA || 0}, Molex ${product.MOLEX || 0}`,
  },
];

export default PSUformer;
