import { Case, ShortSpec } from '../../../../../../types/index';

const Caseformer = (product: Case): ShortSpec[] => [
  { name: 'Form Factor', value: product.caseFormFactor },
  { name: 'Board factor', value: product.formFactor },
  { name: 'PSU factor', value: product.psuFormFactor },
  { name: 'Size', value: product.dimensions },
];

export default Caseformer;
