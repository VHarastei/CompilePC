import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollButtonContainer: {
      position: 'fixed',
      bottom: theme.spacing(4.5),
      right: theme.spacing(45),
    },
  }),
);

export default useStyles;
