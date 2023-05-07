import { PSU, SpecBlock } from '../../types';

const formPSUSpecs = (product: PSU): SpecBlock[] => [
  {
    name: 'Main',
    specs: [
      {
        title: 'Power',
        value: `${product.power} W`,
      },
      {
        title: 'Form factor',
        value: product.psuFormFactor,
      },
    ],
  },
  {
    name: 'Features',
    specs: [
      {
        title: 'PFC Type',
        value: product.PFC,
      },
      {
        title: 'Effiency',
        value: product.efficiency,
      },
      {
        title: 'Cooling system',
        value: product.coolingSystem,
      },
      {
        title: 'Fan size',
        value: product.fanSize,
      },
      {
        title: 'Fan bearings',
        value: product.fanBearings,
      },
      {
        title: 'Certification',
        value: product.certification,
      },
      {
        title: 'ATX 12V v. Standard',
        value: product.atx12vVersion,
      },
    ],
  },
  {
    name: 'Power connectors',
    specs: [
      {
        title: 'Power supply',
        value: product.powerSupply,
      },
      {
        title: 'SATA',
        value: product.SATA,
      },
      {
        title: 'MOLEX',
        value: product.MOLEX,
      },
      {
        title: 'PCI-E 8pin',
        value: product.PCIE8pin,
      },
      {
        title: 'Cable system',
        value: product.cableSystem,
      },
      {
        title: 'Braided wires',
        value: product.braidedWires,
      },
    ],
  },
  {
    name: 'Length of cables',
    specs: [
      {
        title: 'SATA',
        value: product.sataCableLength,
      },
      {
        title: 'MOLEX',
        value: product.molexCableLength,
      },
      {
        title: 'PCIE',
        value: product.PCIECableLength,
      },
      {
        title: 'CPU',
        value: product.cpuCableLength,
      },
      {
        title: 'MB',
        value: product.mbCableLength,
      },
    ],
  },
  {
    name: 'General',
    specs: [
      {
        title: 'Dimensions (HxWxD)',
        value: product.dimensions,
      },
      {
        title: 'Weight',
        value: product.weight,
      },
    ],
  },
];

export default formPSUSpecs;
