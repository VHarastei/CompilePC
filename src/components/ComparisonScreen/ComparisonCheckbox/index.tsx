/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import useStyles from './styles';

type ComparisonCheckboxProps = {
  isChecked: boolean;
  handleChange: () => void;
};

const ComparisonCheckbox: React.FC<ComparisonCheckboxProps> = ({
  isChecked,
  handleChange,
}) => {
  const styles = useStyles();

  return (
    <Box className={styles.checkboxContainer}>
      <Checkbox checked={isChecked} onChange={handleChange} color="secondary" />
      <Typography variant="h6">Compare</Typography>
    </Box>
  );
};

export default ComparisonCheckbox;
