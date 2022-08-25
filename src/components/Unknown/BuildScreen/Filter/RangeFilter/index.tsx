import { InputBase, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect } from 'react';
import { NUMERIC_FORMAT } from '../../../../../common/constants';
import useDebounce from '../../../../../hooks/useDebounce';
import usePriceInputs, {
  PriceRange,
} from '../../../../../hooks/usePriceInputs';
import { BuildScreenContext } from '../../../BuildScreenContext';
import useStyles from './styles';

export type Param = {
  [key: string]: string;
};

type RangeFilterProps = {
  title: string;
};

const RangeFilter: React.FC<RangeFilterProps> = ({ title }) => {
  const styles = useStyles();
  const { handleChangeFilters } = useContext(BuildScreenContext);

  const {
    priceRange,
    handleMinPrice,
    handleMaxPrice,
    validateRange,
    handleSliderChange,
  } = usePriceInputs();

  const debouncedValue = useDebounce<PriceRange>(priceRange, 30);

  useEffect(() => {
    handleChangeFilters({
      minPrice: String(debouncedValue.minPrice),
      maxPrice: String(debouncedValue.maxPrice),
    });
  }, [debouncedValue, handleChangeFilters]);

  return (
    <Box className={styles.wrapper}>
      <Typography gutterBottom variant="h3">
        {title}:
      </Typography>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <InputBase
          value={priceRange.minPrice}
          onChange={handleMinPrice}
          onBlur={validateRange}
          inputProps={{ inputMode: 'numeric', pattern: NUMERIC_FORMAT }}
        />
        <InputBase
          value={priceRange.maxPrice}
          onChange={handleMaxPrice}
          onBlur={validateRange}
          inputProps={{ inputMode: 'numeric', pattern: NUMERIC_FORMAT }}
        />
      </Box>
      <Slider
        color="secondary"
        value={[priceRange.minPrice, priceRange.maxPrice]}
        max={50000}
        step={1000}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        disableSwap
      />
    </Box>
  );
};

export default RangeFilter;
