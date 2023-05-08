import { Case, SpecBlock } from '../../types';

const formCaseSpecs = (product: Case): SpecBlock[] => [
  {
    name: 'Main',
    specs: [
      {
        title: 'Color',
        value: product.colour,
      },
      {
        title: 'Features',
        value: product.target,
      },
      {
        title: 'Form factor',
        value: product.caseFormFactor,
      },
      {
        title: 'Motherboard form factor',
        value: product.formFactor,
      },
      {
        title: 'Board placement',
        value: product.boardPlacement,
      },
      {
        title: 'PSU form factor',
        value: product.psuFormFactor,
      },
      {
        title: 'Mount',
        value: product.mount,
      },
    ],
  },
  {
    name: 'Computer case',
    specs: [
      {
        title: 'Dimensions (HxWxD)',
        value: product.dimensions,
      },
      {
        title: 'Graphics card max lenght',
        value: product.gpuMaxLength,
      },
      {
        title: 'Fan max height',
        value: product.fanMaxHeight,
      },
      {
        title: 'Weight',
        value: product.weight,
      },
      {
        title: 'Material',
        value: product.material,
      },
      {
        title: 'Rubber feet',
        value: product.rubberFeet,
      },
    ],
  },
  {
    name: 'Storage',
    specs: [
      { title: 'PSU Mount', value: product.psuMount },
      { title: '3.5" bays', value: product.bays35 },
      {
        title: 'Internal 2.5" compartments',
        value: product.internal25Compartments,
      },
      {
        title: 'Expansion slots',
        value: product.expansionSlots,
      },
      {
        title: 'Open mechanism',
        value: product.openMechanism,
      },
    ],
  },
  {
    name: 'Cooling',
    specs: [
      { title: 'Fans total', value: product.fansTotal },
      { title: 'Fan mounts total', value: product.fansMountTotal },
      { title: 'Grid front panel', value: product.gridFrontPanel },
      { title: 'Dust filter', value: product.dustFilter },
      { title: 'Liquid cooling support', value: product.liquidCoolingSupport },
    ],
  },
  {
    name: 'Liquid cooling system',
    specs: [{ title: 'Fans total', value: product.liquidCoolingMountsTotal }],
  },
  {
    name: 'Connectors and functions',
    specs: [
      { title: 'Placement', value: product.liquidPlacement },
      { title: 'USB 2.0', value: product.usb20 },
      { title: 'USB 3.2 gen1', value: product.usb32Gen1 },
      { title: 'USB 3.2 gen2', value: product.usb32Gen2 },
      { title: 'USB C 3.2 gen2', value: product.usbc32Gen2 },
      { title: 'Audio (microphone/headphones)', value: product.audioPort },
    ],
  },
  {
    name: 'More features',
    specs: [
      { title: 'Front panel', value: product.frontPanel },
      { title: 'Weight', value: product.weight },
    ],
  },
];

export default formCaseSpecs;
