import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      textAlign: 'justify',
    },
    descriptionPaper: {
      padding: theme.spacing(4),
      width: '100% !important',
    },
  }),
);

export default useStyles;
