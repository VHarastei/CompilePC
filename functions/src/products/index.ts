import Joi from 'joi';
import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';
import naormalizeFilter from '../common/normalizeFilter';
import normalizeAssembly from '../common/normalizeAssembly';
import formatCPUFilter from '../utils/formatCPUFilter';

const getProductsSchema = Joi.object({
  minPrice: Joi.number(),
  maxPrice: Joi.number(),
}).pattern(
  Joi.string(),
  Joi.alternatives(Joi.array().items(Joi.string()), Joi.string()),
);

const getProducts = functions
  .region(DEFAULT_REGION)
  .https.onCall(async (data) => {
    const { collectionName, filter, pageParam, pageSize, assembly } = data;

    const assemblyComponents = normalizeAssembly(assembly);

    switch (collectionName) {
      case 'CPUs':
        formatCPUFilter(assemblyComponents);
        break;
      case 'graphicsCards':
        break;
      case 'PSUs':
        break;
      case 'RAM':
        break;
      case 'solidStateDrives':
        break;
      case 'hardDrives':
        break;
      case 'motherboards':
        break;
      case 'cases':
        break;
      case 'coolings':
        break;
      default:
        break;
    }

    await getProductsSchema.validateAsync(filter);

    const db = await getDB();
    const normalizedFilter = naormalizeFilter(filter);
    const cursor = db
      .collection(collectionName)
      .find(normalizedFilter)
      .limit(pageSize)
      .skip((pageParam - 1) * pageSize);

    const result = await cursor.toArray();

    const count = result.length;

    return {
      result,
      nextPage: count < 10 ? null : pageParam + 1,
    };
  });

export default getProducts;
