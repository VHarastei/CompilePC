import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperWrapper: {
      padding: theme.spacing(4),
      width: `100% !important`,
      marginBottom: theme.spacing(4),
    },
    boxWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      flexWrap: 'wrap',
      maxHeight: '1200px',
    },
  }),
);

export default useStyles;
