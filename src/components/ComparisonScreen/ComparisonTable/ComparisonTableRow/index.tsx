import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { CategorySpec } from '../../../../../types';
import useStyles from './styles';

type ComparisonTableRowProps = {
  spec: CategorySpec;
};

const ComparisonTableRow: React.FC<ComparisonTableRowProps> = ({ spec }) => {
  return (
    <TableRow>
      <TableCell>{spec.title}</TableCell>
      {spec.values.map((value) => (
        <TableCell>{value}</TableCell>
      ))}
    </TableRow>
  );
};

export default ComparisonTableRow;
