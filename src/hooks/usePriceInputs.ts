import { useState } from 'react';
import { minSliderDistance, NUMERIC_INPUT_FORMAT } from '../common/constants';

export type PriceRange = {
  minPrice: number;
  maxPrice: number;
};

const usePriceInputs = (searchParams: URLSearchParams) => {
  const [priceRange, setPriceRange] = useState<PriceRange>({
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 50000,
  });

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NUMERIC_INPUT_FORMAT.test(e.target.value)) {
      const value = Number(e.target.value);
      setPriceRange({ minPrice: value, maxPrice: priceRange.maxPrice });
    }
  };
  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (NUMERIC_INPUT_FORMAT.test(e.target.value)) {
      const value = Number(e.target.value);
      setPriceRange({ minPrice: priceRange.minPrice, maxPrice: value });
    }
  };

  const validateRange = () => {
    if (priceRange.minPrice > priceRange.maxPrice)
      setPriceRange({
        minPrice: priceRange.maxPrice,
        maxPrice: priceRange.minPrice,
      });
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    const atBeginning = activeThumb === 0;

    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minSliderDistance) {
      const clamped = atBeginning
        ? Math.min(newValue[0], 50000 - minSliderDistance)
        : Math.max(newValue[1], minSliderDistance);
      setPriceRange({
        minPrice: atBeginning ? clamped : clamped - minSliderDistance,
        maxPrice: atBeginning ? clamped + minSliderDistance : clamped,
      });
    } else {
      setPriceRange({
        minPrice: newValue[0],
        maxPrice: newValue[1],
      });
    }
  };

  return {
    priceRange,
    handleMinPrice,
    handleMaxPrice,
    validateRange,
    handleSliderChange,
  };
};

export default usePriceInputs;