import { Assembly } from '../../../types';

const normalizeAssembly = (assembly: Assembly) => {
  return Object.fromEntries(
    Object.entries(assembly).filter(([_, value]) => value),
  );
};

export default normalizeAssembly;
