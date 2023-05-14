import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { Part } from '../../../../../types';
import useStyles from './styles';

type ComparisonTableHeadProps = {
  parts: Part[];
};

const ComparisonTableHead: React.FC<ComparisonTableHeadProps> = ({ parts }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {parts.map((part: Part) => (
          <TableCell>{part.name}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ComparisonTableHead;
