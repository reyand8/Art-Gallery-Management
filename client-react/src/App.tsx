import React from 'react';
import { Box, ThemeProvider } from '@mui/material';

import AppRoutes from './routes';
import theme from './assets/theme';


function App() {
  return (
    <>
        <ThemeProvider theme={theme}>
            <Box sx={{
                background: theme.palette.background.default,
                display: 'flex',
                justifyContent: 'center',
            }}>
                <AppRoutes />
            </Box>
        </ThemeProvider>
    </>
  );
}

export default App;
