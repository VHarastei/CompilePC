import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { selectOpenedBuilder } from '../../store/builder/selectors';
import ComparisonTable from './ComparisonTable';

const ComparisonScreen: React.FC = () => {
  const styles = useStyles();

  const openedBuilder = useSelector(selectOpenedBuilder);

  return (
    <Box className={styles.mainContainer}>
      {openedBuilder ? (
        <ComparisonTable category={openedBuilder} />
      ) : (
        <Typography variant="h2">No builder selected.</Typography>
      )}
    </Box>
  );
};

export default ComparisonScreen;
