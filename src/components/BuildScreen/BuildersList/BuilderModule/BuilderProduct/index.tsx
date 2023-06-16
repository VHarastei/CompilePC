import { IconButton, Typography, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { generatePath, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { CategoryName, Part } from '../../../../../../types';
import getShortSpecs from '../ShortSpecs/getShortSpecs';
import {
  selectAssemblyPart,
  selectComparisonParts,
} from '../../../../../store/builder/selectors';
import {
  addAssemblyPart,
  addComparisonItem,
  removeAssemblyPart,
  removeComparisonItem,
} from '../../../../../store/builder/slice';
import { ROUTES } from '../../../../../common/constants';
import ComparisonCheckbox from '../../../../ComparisonScreen/ComparisonCheckbox';

type ProductProps = {
  product: Part;
  category: CategoryName;
};

const BuilderProduct: React.FC<ProductProps> = ({ product, category }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const selectedPart = useSelector(selectAssemblyPart(category));

  const CheckIcon = () =>
    selectedPart && selectedPart.id === product.id ? (
      <IconButton onClick={() => dispatch(removeAssemblyPart(category))}>
        <CloseRoundedIcon className={styles.redIcon} fontSize="large" />
      </IconButton>
    ) : (
      <IconButton
        onClick={() => dispatch(addAssemblyPart({ part: product, category }))}
      >
        <SwapHorizIcon className={styles.greenIcon} fontSize="large" />
      </IconButton>
    );

  const specs = getShortSpecs(product, category);

  const parts = useSelector(selectComparisonParts(category));

  const [isChecked, setIsChecked] = useState<boolean>(
    Boolean(parts.find((part) => part.id === product.id)),
  );

  useEffect(() => {
    setIsChecked(Boolean(parts.find((part) => part.id === product.id)));
  }, [dispatch, parts, product.id]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      dispatch(addComparisonItem({ part: product, category }));
    } else {
      dispatch(removeComparisonItem({ part: product, category }));
    }
  };

  return (
    <>
      <Box className={styles.wrapper}>
        <Box className={styles.leftWrapper}>
          <Link
            style={{ textDecoration: 'none' }}
            to={generatePath(ROUTES.PRODUCT, { category, id: product.id })}
          >
            <img
              className={styles.image}
              src={product.mainImage}
              alt={product.name}
            />
          </Link>
          <Box>
            <Link
              style={{ textDecoration: 'none' }}
              to={generatePath(ROUTES.PRODUCT, { category, id: product.id })}
            >
              <Typography variant="h5" className={styles.productName}>
                {product.name}
              </Typography>
            </Link>
            <Box>
              {specs?.map(
                (spec) =>
                  spec.value && (
                    <Box key={spec.name} className={styles.specsWrapper}>
                      <Typography
                        variant="h6"
                        marginRight={1}
                        minWidth="100px"
                      >{`${spec.name}: `}</Typography>
                      <Typography fontWeight="bold">{spec.value}</Typography>
                    </Box>
                  ),
              )}
            </Box>
          </Box>
        </Box>
        <Box className={styles.rightWrapper}>
          <Typography variant="h5">
            {product.price.range.minPrice}₴ - {product.price.range.maxPrice}₴
          </Typography>
          {selectedPart ? (
            <CheckIcon />
          ) : (
            <IconButton
              onClick={() =>
                dispatch(addAssemblyPart({ part: product, category }))
              }
            >
              <AddRoundedIcon className={styles.greenIcon} fontSize="large" />
            </IconButton>
          )}
        </Box>
      </Box>
      <ComparisonCheckbox
        isChecked={isChecked}
        handleChange={handleCheckboxChange}
      />
    </>
  );
};

export default BuilderProduct;
