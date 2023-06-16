import React from 'react';
import { Table, TableContainer } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectComparisonParts } from '../../../store/builder/selectors';
import { CategoryName, CategorySpec } from '../../../../types';
import ComparisonTableHead from './ComparisonTableHead';
import ComparisonTableBody from './ComparisonTableBody';
import getCategorySpecs from '../../../utils/getCategorySpecs';
import useStyles from './styles';

type ComparisonTableProps = {
  category: CategoryName;
};

const ComparisonTable: React.FC<ComparisonTableProps> = ({ category }) => {
  const comparisonParts = useSelector(selectComparisonParts(category));

  const categorySpec = getCategorySpecs(
    category,
    comparisonParts,
  ) as CategorySpec[];

  return (
    <TableContainer>
      <Table>
        <ComparisonTableHead parts={comparisonParts} />
        <ComparisonTableBody specs={categorySpec} />
      </Table>
    </TableContainer>
  );
};

export default ComparisonTable;
