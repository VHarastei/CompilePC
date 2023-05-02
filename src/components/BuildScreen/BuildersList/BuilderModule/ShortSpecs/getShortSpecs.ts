import {
  CategoryName,
  CPU,
  GraphicsCard,
  HardDrive,
  SolidStateDrive,
  Case,
  Cooling,
  PSU,
  RAM,
  Motherboard,
  Part,
  ShortSpec,
} from '../../../../../../types';
import CPUformer from './CPUformer';
import Caseformer from './Caseformer';
import Coolingformer from './Coolingformer';
import GPUformer from './GPUformer';
import HDDformer from './HDDformer';
import Motherboardformer from './Motherboardformer';
import PSUformer from './PSUformer';
import RAMformer from './RAMformer';
import SSDformer from './SSDformer';

const getShortSpecs = (
  product: Part | null,
  category: CategoryName,
): ShortSpec[] | null => {
  if (!product) return null;
  switch (category) {
    case 'CPU':
      return CPUformer(product as CPU);
    case 'GPU':
      return GPUformer(product as GraphicsCard);
    case 'HDD':
      return HDDformer(product as HardDrive);
    case 'SSD':
      return SSDformer(product as SolidStateDrive);
    case 'PSU':
      return PSUformer(product as PSU);
    case 'RAM':
      return RAMformer(product as RAM);
    case 'motherboard':
      return Motherboardformer(product as Motherboard);
    case 'case':
      return Caseformer(product as Case);
    case 'cooling':
      return Coolingformer(product as Cooling);
    default:
      return null;
  }
};

export default getShortSpecs;
