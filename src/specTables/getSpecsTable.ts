import {
  SpecBlock,
  GraphicsCard,
  Part,
  CategoryName,
  CPU,
  PSU,
  RAM,
  Motherboard,
} from '../../types';
import formCPUSpecs from './cpuSpecs';
import formGPUSpecs from './gpuSpecs';
import formMotherboardSpecs from './motherboardSpecs';
import formPSUSpecs from './psuSpecs';
import formRAMSpecs from './ramSpecs';

const getSpecsTable = (
  product: Part | undefined,
  category: CategoryName,
): SpecBlock[] | null => {
  if (!product) return null;
  switch (category) {
    case 'CPU':
      return formCPUSpecs(product as CPU);
    case 'GPU':
      return formGPUSpecs(product as GraphicsCard);
    case 'HDD':
      return null;
    case 'SSD':
      return null;
    case 'PSU':
      return formPSUSpecs(product as PSU);
    case 'RAM':
      return formRAMSpecs(product as RAM);
    case 'motherboard':
      return formMotherboardSpecs(product as Motherboard);
    case 'case':
      return null;
    case 'cooling':
      return null;
    default:
      return null;
  }
};

export default getSpecsTable;
