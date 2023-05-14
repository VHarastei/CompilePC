import React from 'react';
import { TableBody } from '@mui/material';
import { CategorySpec } from '../../../../../types';
import ComparisonTableRow from '../ComparisonTableRow';
import useStyles from './styles';

type ComparisonTableBodyProps = {
  specs: CategorySpec[];
};

const ComparisonTableBody: React.FC<ComparisonTableBodyProps> = ({ specs }) => {
  return (
    <TableBody>
      {specs.map((spec) => (
        <ComparisonTableRow spec={spec} />
      ))}
    </TableBody>
  );
};

export default ComparisonTableBody;
