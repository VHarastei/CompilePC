import { createStyles, makeStyles } from '@mui/styles';
import { Theme, alpha } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    comparisonContainer: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      zIndex: 1251,
    },
    buttonStyles: {
      bottom: theme.spacing(5),
      right: theme.spacing(5),
    },
    drawer: {
      zIndex: '1250 !important',
    },
    paperStyles: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flexDirection: 'row',
      gap: theme.spacing(5),
    },
    drawerPaper: {
      display: 'flex',
      flexDirection: 'row',
      gap: theme.spacing(10),
      padding: theme.spacing(3),
      minHeight: theme.spacing(60),
      maxWidth: theme.spacing(250),
      maxHeight: theme.spacing(80),
      backgroundColor: theme.palette.backgroundGrey,
      overflowY: 'auto',
      flexWrap: 'wrap',
      '&::-webkit-scrollbar': {
        width: 4,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.green,
        borderRadius: theme.shape.borderRadius,
      },
    },
    typo: {
      alignSelf: 'center',
    },
    fab: {
      '&.MuiFab-root': {
        backgroundColor: alpha(theme.palette.primary.main, 0.5),
        color: theme.palette.primary.contrastText,
        zIndex: 1300,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.9),
        },
      },
    },
  }),
);

export default useStyles;