import { Box, Button, Drawer, Fab, Typography } from '@mui/material';
import React, { useState } from 'react';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useSelector } from 'react-redux';
import { Link, generatePath } from 'react-router-dom';
import useStyles from './styles';
import {
  selectComparisonParts,
  selectOpenedBuilder,
} from '../../../store/builder/selectors';
import ComparisonItem from '../ComparisonItem';
import { CategoryName } from '../../../../types';
import { ROUTES } from '../../../common/constants';

const ComparisonDrawer: React.FC = () => {
  const styles = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const openedBuilder = useSelector(selectOpenedBuilder) as CategoryName;

  const comparisonParts = useSelector(selectComparisonParts(openedBuilder));

  const ComparisonItems = () => {
    return comparisonParts?.length ? (
      comparisonParts.map((part) => (
        <ComparisonItem product={part} category={openedBuilder} key={part.id} />
      ))
    ) : (
      <Typography className={styles.typo} variant="h5">
        No parts selected
      </Typography>
    );
  };

  return (
    <>
      <Box className={styles.comparisonContainer}>
        <Button
          className={styles.buttonStyles}
          color="secondary"
          variant="contained"
          onClick={toggleDrawer}
        >
          Comparison
        </Button>
      </Box>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        open={isOpen}
        onClose={toggleDrawer}
        variant="persistent"
      >
        <Box className={styles.container}>
          <Box className={styles.drawerPaper}>
            {openedBuilder ? (
              ComparisonItems()
            ) : (
              <Typography className={styles.typo} variant="h5">
                No category selected
              </Typography>
            )}
          </Box>
          <Box className={styles.buttonContainer}>
            {comparisonParts?.length > 1 && (
              <Link
                style={{ textDecoration: 'none' }}
                to={generatePath(ROUTES.COMPARISON)}
              >
                <Fab variant="extended" className={styles.fab}>
                  <CompareArrowsIcon fontSize="large" />
                </Fab>
              </Link>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ComparisonDrawer;
