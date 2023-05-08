import { CommonFilter } from '../../../src/utils/getCompatiblePropsValues';
import { regexes } from './constants';

export const generateRange = (prop: string) => {
  const array = prop.split('-');
  const range = Array.from(
    { length: (Number(array[1]) - Number(array[0])) * 10 + 1 },
    (_, i) => `${(i + Number(array[0]) * 10) / 10} ${array[2]}`,
  );
  return range;
};

export const parseProp = (prop: string) => {
  if (regexes.numericFormat.test(prop)) return prop;
  if (
    (prop.includes('-') && prop.includes('maxPrice')) ||
    prop.includes('minPrice')
  )
    return generateRange(prop);
  return [prop];
};

const normalizeFilter = (params: CommonFilter) => {
  const normalizedParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value),
  );

  const parsedFilters = Object.fromEntries(
    Object.entries(normalizedParams).map(([key, value]) => [
      key,
      Array.isArray(value)
        ? value.map((el) => parseProp(el)).flat()
        : parseProp(value as string),
    ]),
  );

  const properFilter = Object.fromEntries(
    Object.entries(parsedFilters)
      .map(([key]) => [
        key,
        {
          ['$in']: parsedFilters[key],
        },
      ])
      .filter(([key]) => key !== 'maxPrice' && key !== 'minPrice'),
  );

  const filteredPower = parsedFilters.power
    ? Object.assign(properFilter, {
        ['power']: {
          $gte: Number(parsedFilters.power),
        },
      })
    : properFilter;

  const filter =
    parsedFilters.maxPrice && parsedFilters.minPrice
      ? Object.assign(filteredPower, {
          ['price.range.maxPrice']: {
            $lte: Number(parsedFilters.maxPrice) || 50000,
          },
          ['price.range.minPrice']: {
            $gte: Number(parsedFilters.minPrice) || 0,
          },
        })
      : filteredPower;

  return filter;
};

export default normalizeFilter;
