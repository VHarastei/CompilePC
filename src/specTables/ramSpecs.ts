import { RAM, SpecBlock } from '../../types';

const formRAMSpecs = (product: RAM): SpecBlock[] => [
  {
    name: 'Main',
    specs: [
      {
        title: 'Color',
        value: product.colour,
      },
      {
        title: 'Memory capacity',
        value: product.capacity,
      },
      {
        title: 'Memory modules',
        value: product.modules,
      },
      {
        title: 'Form factor',
        value: product.formFactor,
      },
      {
        title: 'Type',
        value: product.ramType,
      },
      {
        title: 'Memory speed',
        value: product.speed,
      },
      {
        title: 'Clock speed',
        value: product.clockSpeed,
      },
      {
        title: 'CAS Latency',
        value: product.casLatency,
      },
      {
        title: 'Memory timing',
        value: product.timing,
      },
      {
        title: 'Voltage',
        value: product.voltage,
      },
      {
        title: 'Cooling',
        value: product.cooling,
      },
      {
        title: 'Module profile',
        value: product.moduleProfile,
      },
      {
        title: 'Module height',
        value: product.moduleHeight,
      },
    ],
  },
];

export default formRAMSpecs;
