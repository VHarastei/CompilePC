import React from 'react';
import { Box, Typography, Fab, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { CategoryName, Part } from '../../../../types';
import { removeComparisonItem } from '../../../store/builder/slice';

type ComparisonItemProps = {
  product: Part;
  category: CategoryName;
};

const ComparisonItem: React.FC<ComparisonItemProps> = ({
  product,
  category,
}) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  return (
    <Box className={styles.comparisonItemContainer}>
      <Box className={styles.imageContainer}>
        <img
          alt={product.name}
          src={product.mainImage}
          className={styles.comparisonImage}
        />
      </Box>
      <Tooltip title={product.name}>
        <Typography className={styles.typo} variant="h6">
          {product.name}
        </Typography>
      </Tooltip>
      <Fab
        className={styles.fab}
        size="small"
        onClick={() =>
          dispatch(removeComparisonItem({ part: product, category }))
        }
      >
        <CloseIcon />
      </Fab>
    </Box>
  );
};

export default ComparisonItem;
