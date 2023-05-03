import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { SpecBlock } from '../../../../../../types';
import TableRow from '../TableRow';
import useStyles from './styles';

type TableBlockProps = {
  specBlock: SpecBlock;
};

const TableBlock: React.FC<TableBlockProps> = ({ specBlock }) => {
  const styles = useStyles();

  if (specBlock.specs.every((spec) => !spec.value)) {
    return null;
  }

  return (
    <Box className={styles.tableBlock}>
      <Typography variant="h4">{specBlock.name}</Typography>
      {specBlock.specs.map((spec) => (
        <TableRow spec={spec} key={spec.title} />
      ))}
    </Box>
  );
};

export default TableBlock;
