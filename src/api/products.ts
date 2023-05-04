import { CollectionName, FullProduct, Part } from '../../types';
import functions from '../common/firebaseFunctons';

type Filter = Record<string, string | string[]>;

type Response = {
  result: Part[];
  nextPage: number | null;
};

const Products = {
  get: async (
    id: string,
    collectionName: CollectionName,
  ): Promise<FullProduct> => {
    const getProduct = functions.httpsCallable('getProduct');
    const { data: product }: { data: FullProduct } = await getProduct({
      id,
      collectionName,
    });
    return product;
  },
  list: async (
    collectionName: CollectionName,
    filter: Filter,
    pageParam: number,
    pageSize: number,
  ): Promise<Response> => {
    const getProducts = functions.httpsCallable('getProducts');
    const { data: result }: { data: Response } = await getProducts({
      collectionName,
      filter,
      pageParam,
      pageSize,
    });
    return result;
  },
};

export default Products;
