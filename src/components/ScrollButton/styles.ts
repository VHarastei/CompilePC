import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollButtonContainer: {
      position: 'fixed',
      width: theme.spacing(10),
      bottom: theme.spacing(5),
      right: theme.spacing(15),
    },
  }),
);

export default useStyles;
