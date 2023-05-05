import { Part } from '../../../types';

const formatCPUFilter = (assemblyComponents: { [k: string]: Part | null }) => {
  Object.keys(assemblyComponents).forEach((key) => {
    switch (key) {
      case 'motherboard':
        break;
    }
  });
};

export default formatCPUFilter;
