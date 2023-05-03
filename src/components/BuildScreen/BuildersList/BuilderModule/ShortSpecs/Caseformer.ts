import { Case, ShortSpec } from '../../../../../../types/index';

const Caseformer = (product: Case): ShortSpec[] => [
  { name: 'Form Factor', value: product.formFactor },
  { name: 'Board form factor', value: product.motherboardFormFactor },
  { name: 'PSU form factor', value: product.psuFormFactor },
  { name: 'Size', value: product.dimensions },
];

export default Caseformer;
