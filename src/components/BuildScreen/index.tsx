import React from 'react';
import { Box } from '@mui/system';
import useStyles from './styles';
import Filter from './Filter';
import Assembly from './Assembly';
import BuildersList from './BuildersList';
import ScrollButton from '../ScrollButton';

const BuildScreen: React.FC = () => {
  const styles = useStyles();

  return (
    <Box className={styles.mainContainer}>
      <Filter />
      <BuildersList />
      <Assembly />
      <ScrollButton />
    </Box>
  );
};

export default BuildScreen;
