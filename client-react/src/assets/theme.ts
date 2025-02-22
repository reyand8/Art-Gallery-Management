import { createTheme } from '@mui/material';


const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#004d40',
            dark: 'rgb(7,68,58)',
            light: 'rgb(90,173,162)',
            contrastText: '#ffffff',
        },
        background: {
            default: 'linear-gradient(80deg, #3e7567, #004d40)',
            paper: '#fff',
        },
        text: {
            primary: '#ffffff',
            secondary: '#000000'
        },
        error: {
            main: '#d32f2f',
            light: '#db5858',
            dark: '#932020',
            contrastText: '#ffffff',
        },
    },
});

export default theme;