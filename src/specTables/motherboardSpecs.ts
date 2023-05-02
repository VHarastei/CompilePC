import { Motherboard, SpecBlock } from '../../types';

const formMotherboardSpecs = (product: Motherboard): SpecBlock[] => [
  {
    name: 'Main',
    specs: [
      {
        title: 'Socket',
        value: product.socket,
      },
      {
        title: 'Form Factor',
        value: product.formFactor,
      },
      {
        title: 'Power phases',
        value: product.powerPhases,
      },
      {
        title: 'VRM heatsink',
        value: product.VRMHeatsink,
      },
      {
        title: 'Size (HxW)',
        value: product.size,
      },
    ],
  },
  {
    name: 'Chipset',
    specs: [
      {
        title: 'Chipset',
        value: product.chipset,
      },
      {
        title: 'BIOS',
        value: product.BIOS,
      },
    ],
  },
  {
    name: 'RAM',
    specs: [
      {
        title: 'DDR4',
        value: product.DDR4,
      },
      {
        title: 'Memory module',
        value: product.memoryModule,
      },
      {
        title: 'Operation module',
        value: product.operationMode,
      },
      {
        title: 'Max. clock frequency',
        value: product.maxClockFrequency,
      },
      {
        title: 'Max. memory',
        value: product.maxMemory,
      },
    ],
  },
  {
    name: 'Video outputs',
    specs: [
      {
        title: 'VGA',
        value: product.VGA,
      },
      {
        title: 'HDMI output',
        value: product.HDMI,
      },
      {
        title: 'HDMI version',
        value: product.HDMIVersion,
      },
      {
        title: 'Display Port',
        value: product.displayPort,
      },
      {
        title: 'Display Port version',
        value: product.displayPortVersion,
      },
    ],
  },
  {
    name: 'Integrated audio',
    specs: [
      {
        title: 'Audiochip',
        value: product.audiochip,
      },
      {
        title: 'Sound (channels)',
        value: product.sound,
      },
    ],
  },
  {
    name: 'Drive Interface',
    specs: [
      {
        title: 'SATA 3',
        value: product.sata3,
      },
      {
        title: 'M.2',
        value: product.m2,
      },
    ],
  },
  {
    name: 'Expansion slots',
    specs: [
      {
        title: 'PCI-E 16x slots',
        value: product.PCI_E_16x,
      },
      {
        title: 'PCI Express version',
        value: product.PCIExpressVerison,
      },
    ],
  },
  {
    name: 'External connections',
    specs: [
      {
        title: 'USB 2.0',
        value: product.ExternalUSB_2_0,
      },
      {
        title: 'USB 3.2 gen1',
        value: product.ExternalUSB_3_2_gen1,
      },
      {
        title: 'USB 3.2 gen2',
        value: product.ExternalUSB_3_2_gen2,
      },
    ],
  },
  {
    name: 'Internal connections',
    specs: [
      {
        title: 'USB 2.0',
        value: product.InternalUSB_2_0,
      },
      {
        title: 'USB 3.2 gen1',
        value: product.InternalUSB_3_2_gen1,
      },
      {
        title: 'USB 3.2 gen2',
        value: product.InternalUSB_3_2_gen2,
      },
    ],
  },
  {
    name: 'Power connectors',
    specs: [
      {
        title: 'Main power socket',
        value: product.mainPowerSocket,
      },
      {
        title: 'CPU power',
        value: product.CPUPowerSocket,
      },
      {
        title: 'Fan power connectors',
        value: product.FanPowerConnectors,
      },
    ],
  },
];

export default formMotherboardSpecs;
