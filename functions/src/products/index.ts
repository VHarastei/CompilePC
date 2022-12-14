import Joi = require('joi');
import { getDB } from '../bootstrap';
import { DEFAULT_REGION } from '../common/constants';
import * as functions from 'firebase-functions';
import naormalizeFilter from '../common/normalizeFilter';

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
    const { collectionName, filter } = data;
    await getProductsSchema.validateAsync(filter);

    const db = await getDB();
    const normalizedFilter = naormalizeFilter(filter);
    const cursor = await db.collection(collectionName).find(normalizedFilter);
    const result = await cursor.toArray();

    return result;
  });

export default getProducts;
