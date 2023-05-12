import { createStyles, makeStyles } from '@mui/styles';
import { Theme, alpha } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    comparisonImage: {
      borderRadius: theme.spacing(4),
      width: theme.spacing(20),
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    comparisonItemContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      maxHeight: theme.spacing(30),
    },
    fab: {
      '&.MuiFab-root': {
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
        color: theme.palette.primary.contrastText,
        position: 'absolute',
        top: 0,
        right: 0,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
        },
      },
    },
    typo: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: theme.spacing(40),
    },
  }),
);

export default useStyles;
