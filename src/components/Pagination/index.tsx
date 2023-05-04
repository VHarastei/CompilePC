/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button/Button';

// eslint-disable-next-line @typescript-eslint/ban-types
type PaginationProps = {
  fetchNextPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({ fetchNextPage }) => {
  const handleClick = () => {
    fetchNextPage();
  };

  return (
    <Box display="flex" justifyContent="center" padding="5px">
      <Button onClick={handleClick} color="secondary" variant="contained">
        Load More
      </Button>
    </Box>
  );
};

export default Pagination;
