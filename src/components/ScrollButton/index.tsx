import { Fab, Zoom, Box } from '@mui/material';
import React, { useCallback } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import useStyles from './styles';

const ScrollButton: React.FC = () => {
  const styles = useStyles();

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Zoom in={trigger}>
      <Box role="presentation" className={styles.scrollButtonContainer}>
        <Fab
          onClick={scrollToTop}
          color="primary"
          size="small"
          aria-label="scroll back to top"
        >
          <ArrowUpwardIcon />
        </Fab>
      </Box>
    </Zoom>
  );
};

export default ScrollButton;
