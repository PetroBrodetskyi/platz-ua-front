import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const LinearDeterminate = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  return (
    <Box sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 1100 }}>
      {loading && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'gold',
            },
            '& .MuiLinearProgress-root': {
              height: '4px',
            },
          }}
        />
      )}
    </Box>
  );
};

export default LinearDeterminate;
