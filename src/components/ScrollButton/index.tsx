import { Button, Box } from '@mui/material';
import React, { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import useStyles from './styles';

const ScrollButton = () => {
  const styles = useStyles();
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <Box
      className={styles.scrollButtonContainer}
      sx={{ display: visible ? 'inline' : 'none' }}
    >
      <Button
        onClick={scrollToTop}
        color="primary"
        variant="contained"
        size="small"
      >
        <ArrowUpwardIcon />
      </Button>
    </Box>
  );
};

export default ScrollButton;
