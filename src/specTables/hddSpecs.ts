import { HardDrive, SpecBlock } from '../../types';

const formHDDSpecs = (product: HardDrive): SpecBlock[] => [
  {
    name: 'Main',
    specs: [
      {
        title: 'Type',
        value: product.type,
      },
      {
        title: 'Capacity',
        value: product.capacity,
      },
      {
        title: 'Form factor',
        value: product.formFactor,
      },
    ],
  },
  {
    name: 'Connection',
    specs: [
      {
        title: 'Interface',
        value: product.driveInterface,
      },
    ],
  },
  {
    name: 'Technical specs',
    specs: [
      {
        title: 'Cache memory',
        value: product.cacheMemory,
      },
      {
        title: 'Record technology',
        value: product.recordTechnology,
      },
      {
        title: 'RPM',
        value: product.RPM,
      },
      {
        title: 'Data transfer rate',
        value: product.dataTransferRate,
      },
      {
        title: 'Operation power consumption',
        value: product.operationPowerConsumption,
      },
      {
        title: 'Standby power consumption',
        value: product.standbyPowerConsumption,
      },
      {
        title: 'MTBF',
        value: product.MTBF,
      },
    ],
  },
  {
    name: 'General',
    specs: [
      {
        title: 'Size',
        value: product.size,
      },
      {
        title: 'Weight',
        value: product.weight,
      },
    ],
  },
];

export default formHDDSpecs;
