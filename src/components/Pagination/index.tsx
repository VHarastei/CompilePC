/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button/Button';

// eslint-disable-next-line @typescript-eslint/ban-types
type PaginationProps = {
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const handleClick = () => {
    fetchNextPage();
  };

  return (
    <Box display="flex" justifyContent="center" padding="5px">
      <Button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={handleClick}
        color="secondary"
        variant="contained"
      >
        {!hasNextPage
          ? 'Nothing more to load'
          : isFetchingNextPage
          ? 'Loading...'
          : 'Load more'}
      </Button>
    </Box>
  );
};

export default Pagination;
