import { CPU, SpecBlock } from '../../types';

const formCPUSpecs = (product: CPU): SpecBlock[] => [
  {
    name: 'Main',
    specs: [
      {
        title: 'Series',
        value: product.series,
      },
      {
        title: 'Code name',
        value: product.codeName,
      },
      {
        title: 'Socket',
        value: product.socket,
      },
    ],
  },
  {
    name: 'Cores and threads',
    specs: [
      {
        title: 'Cores',
        value: product.cores,
      },
      {
        title: 'Threads',
        value: product.threads,
      },
    ],
  },
  {
    name: 'Clock speed',
    specs: [
      {
        title: 'Clock speed',
        value: product.clockSpeed,
      },
      {
        title: 'Turbo boost',
        value: product.turboBoost,
      },
    ],
  },
  {
    name: 'Memory cache size',
    specs: [
      {
        title: 'L1 cache',
        value: product.l1Cache,
      },
      {
        title: 'L2 cache',
        value: product.l2Cache,
      },
      {
        title: 'L3 cache',
        value: product.l3Cache,
      },
    ],
  },
  {
    name: 'Features',
    specs: [
      {
        title: 'IGP Model',
        value: product.IGP,
      },
      {
        title: 'TDP',
        value: product.TDP,
      },
      {
        title: 'PCI Express support',
        value: product.PSIExpress,
      },
      {
        title: 'Max. operating temperature',
        value: product.maxOperatingTemperature,
      },
    ],
  },
  {
    name: 'Memory support',
    specs: [
      {
        title: 'Max. clock speed of DDR4',
        value: product.maxDDR4Speed,
      },
      {
        title: 'Number of channels',
        value: product.channels,
      },
    ],
  },
];

export default formCPUSpecs;
