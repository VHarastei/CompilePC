import React from 'react';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box } from '@mui/system';
import ProductAccordion from './ProductAccordion';
import BuilderProduct from './BuilderProduct';
import {
  IconByCategory,
  DEFAULT_PAGE_SIZE,
} from '../../../../common/constants';
import { Builder, Part } from '../../../../../types';
import SkeletonProduct from './SkeletonProduct';
import useProducts from '../../../../hooks/useProducts';
import Pagination from '../../../Pagination';

type BuilderProps = {
  builder: Builder;
};

const BuilderModule: React.FC<BuilderProps> = ({ builder }) => {
  const {
    data: products,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useProducts({ builder, pageSize: DEFAULT_PAGE_SIZE });

  const BuilderProducts = () => (
    <>
      {(isLoading ? Array.from(new Array(5)) : products?.pages || []).map(
        (group, index) =>
          group ? (
            group.result.map((product: Part) => (
              <BuilderProduct
                product={product}
                key={product.id}
                category={builder.categoryName}
              />
            ))
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <SkeletonProduct key={index} />
          ),
      )}
    </>
  );

  return (
    <ProductAccordion
      icon={IconByCategory[builder.categoryName]}
      builder={builder}
    >
      {isError ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <ErrorOutlineIcon />
          <Typography variant="h3">
            Couldn&#39;t load {builder.categoryName}
          </Typography>
        </Box>
      ) : (
        <BuilderProducts />
      )}
      {!isLoading && (
        <Pagination
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </ProductAccordion>
  );
};

export default BuilderModule;
