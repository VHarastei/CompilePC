/* eslint-disable consistent-return */
/* eslint-disable default-case */
import {
  SpecBlock,
  GraphicsCard,
  Part,
  CategoryName,
  CPU,
  PSU,
  RAM,
  Motherboard,
  HardDrive,
  SolidStateDrive,
  Case,
  Cooling,
} from '../../types';
import formCaseSpecs from './caseSpecs';
import formCoolingSpecs from './coolingSpecs';
import formCPUSpecs from './cpuSpecs';
import formGPUSpecs from './gpuSpecs';
import formHDDSpecs from './hddSpecs';
import formMotherboardSpecs from './motherboardSpecs';
import formPSUSpecs from './psuSpecs';
import formRAMSpecs from './ramSpecs';
import formSSDSpecs from './ssdSpecs';

const getSpecsTable = (product: Part, category: CategoryName): SpecBlock[] => {
  switch (category) {
    case 'CPU':
      return formCPUSpecs(product as CPU);
    case 'GPU':
      return formGPUSpecs(product as GraphicsCard);
    case 'HDD':
      return formHDDSpecs(product as HardDrive);
    case 'SSD':
      return formSSDSpecs(product as SolidStateDrive);
    case 'PSU':
      return formPSUSpecs(product as PSU);
    case 'RAM':
      return formRAMSpecs(product as RAM);
    case 'motherboard':
      return formMotherboardSpecs(product as Motherboard);
    case 'case':
      return formCaseSpecs(product as Case);
    case 'cooling':
      return formCoolingSpecs(product as Cooling);
  }
};

export default getSpecsTable;
