/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
import { CPU, CategoryName, Part } from '../../types';

const getCategorySpecs = (category: CategoryName, parts: Part[]) => {
  switch (category) {
    case 'CPU':
      const CPUs = parts as CPU[];

      return [
        {
          title: 'Series',
          values: CPUs.map((cpu) => cpu.series),
        },
        {
          title: 'Socket',
          values: CPUs.map((cpu) => cpu.socket),
        },
        {
          title: 'Lithography',
          values: CPUs.map((cpu) => cpu.lithography),
        },
        {
          title: 'Cores',
          values: CPUs.map((cpu) => cpu.cores),
        },
        {
          title: 'Threads',
          values: CPUs.map((cpu) => cpu.threads),
        },
        {
          title: 'Clock speed',
          values: CPUs.map((cpu) => cpu.clockSpeed),
        },
        {
          title: 'Turbo boost',
          values: CPUs.map((cpu) => cpu.turboBoost),
        },
        {
          title: 'L1 cache',
          values: CPUs.map((cpu) => cpu.l1Cache),
        },
        {
          title: 'L2 cache',
          values: CPUs.map((cpu) => cpu.l2Cache),
        },
        {
          title: 'L3 cache',
          values: CPUs.map((cpu) => cpu.l3Cache),
        },
        {
          title: 'IGP Model',
          values: CPUs.map((cpu) => cpu.IGP),
        },
        {
          title: 'TDP',
          values: CPUs.map((cpu) => cpu.TDP),
        },
        {
          title: 'PCI Express support',
          values: CPUs.map((cpu) => cpu.PCIExpress),
        },
        {
          title: 'Max. operating temperature',
          values: CPUs.map((cpu) => cpu.maxOperatingTemperature),
        },
        {
          title: 'Max. clock speed of DDR4',
          values: CPUs.map((cpu) => cpu.maxDDR4Speed),
        },
        {
          title: 'Number of channels',
          values: CPUs.map((cpu) => cpu.channels),
        },
      ];
    // case 'GPU':
    //   return;
    // case 'HDD':
    //   return;
    // case 'SSD':
    //   return;
    // case 'PSU':
    //   return;
    // case 'RAM':
    //   return;
    // case 'motherboard':
    //   return;
    // case 'case':
    //   return;
    // case 'cooling':
    //   return;
  }
};

export default getCategorySpecs;
