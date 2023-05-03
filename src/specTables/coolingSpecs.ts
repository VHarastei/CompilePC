import { Cooling, SpecBlock } from '../../types';

const formCoolingSpecs = (product: Cooling): SpecBlock[] => [
  {
    name: 'Main',
    specs: [
      {
        title: 'Features',
        value: product.target,
      },
      {
        title: 'Type',
        value: product.type,
      },
    ],
  },
  {
    name: 'Radiator',
    specs: [
      {
        title: 'Heat pipes',
        value: product.heatPipes,
      },
      {
        title: 'Heatpipe contact',
        value: product.heatPipeContact,
      },
      {
        title: 'Heatpipe material',
        value: product.heatSinkMaterial,
      },
      {
        title: 'Plate material',
        value: product.plateMaterial,
      },
      {
        title: 'Socket',
        value: product.socket.join(', '),
      },
    ],
  },
  {
    name: 'Fan',
    specs: [
      {
        title: 'Number of fans',
        value: product.fans,
      },
      {
        title: 'Fan size',
        value: product.fanSize,
      },
      {
        title: 'Bearing',
        value: product.bearing,
      },
      {
        title: 'Min. RPM',
        value: product.minRPM,
      },
      {
        title: 'Max. RPM',
        value: product.maxRPM,
      },
      {
        title: 'Speed controller',
        value: product.speedController,
      },
      {
        title: 'Max. air flow',
        value: product.maxAirFlow,
      },
      {
        title: 'Static pressure',
        value: product.staticPressure,
      },
      {
        title: 'Max. TDP',
        value: product.maxTDP,
      },
      {
        title: 'Air flow direction',
        value: product.airFlowDirection,
      },
      {
        title: 'Replaceable',
        value: product.replaceable,
      },
    ],
  },
  {
    name: 'General',
    specs: [
      {
        title: 'Power source',
        value: product.powerSource,
      },
      {
        title: 'Min noise level',
        value: product.minNoiseLevel,
      },
      {
        title: 'Noise level',
        value: product.noiseLevel,
      },
      {
        title: 'Mount type',
        value: product.mountType,
      },
      {
        title: 'Dimensions',
        value: product.dimensions,
      },
      {
        title: 'Height',
        value: product.height,
      },
      {
        title: 'Weight',
        value: product.weight,
      },
    ],
  },
];

export default formCoolingSpecs;
