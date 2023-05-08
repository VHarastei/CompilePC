/* eslint-disable default-case */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
import {
  CPU,
  Case,
  CategoryName,
  Cooling,
  GraphicsCard,
  HardDrive,
  Motherboard,
  PSU,
  Part,
  RAM,
  SolidStateDrive,
} from '../../types';

const getCompatibleFilterValues = (category: CategoryName, part: Part) => {
  let filters;

  switch (category) {
    case 'CPU':
      const cpu = part as CPU;
      filters = {
        socket: cpu.socket,
        ramType: cpu.ramType,
      };
      break;
    case 'GPU':
      const gpu = part as GraphicsCard;
      filters = {
        power: gpu.power,
        interface: gpu.interface,
      };
      break;
    case 'PSU':
      const psu = part as PSU;
      filters = {
        power: psu.power,
        psuFormFactor: psu.psuFormFactor,
      };
      break;
    case 'RAM':
      const ram = part as RAM;
      filters = {
        ramType: ram.ramType,
      };
      break;
    case 'SSD':
      const ssd = part as SolidStateDrive;
      filters = {
        ssdInterface: ssd.ssdInterface,
      };
      break;
    case 'HDD':
      const hdd = part as HardDrive;
      filters = {
        driveInterface: hdd.driveInterface,
      };
      break;
    case 'case':
      const computerCase = part as Case;
      filters = {
        formFactor: computerCase.formFactor,
        psuFormFactor: computerCase.psuFormFactor,
      };
      break;
    case 'cooling':
      const computerCooling = part as Cooling;
      filters = {
        socket: computerCooling.socket,
      };
      break;
    case 'motherboard':
      const mb = part as Motherboard;
      filters = {
        socket: mb.socket,
        formFactor: mb.formFactor,
        ramType: mb.ramType,
        interface: mb.interface,
        driveInterfaces: mb.driveInterfaces,
      };
      break;
  }

  return filters;
};

export default getCompatibleFilterValues;
