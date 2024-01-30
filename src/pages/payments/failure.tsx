import { NextPage } from 'next';
import React from 'react';
import { Box, Typography } from '@mui/material';

const ErrorPage: NextPage = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100%">
      <Typography
        sx={{
          width: '280px',
          textAlign: 'center',
          marginTop: '24px',
        }}>
        Please, review your payment information and try again
      </Typography>
    </Box>
  );
};

export default ErrorPage;
