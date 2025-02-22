import { Box, Paper, styled } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

import theme from '../../assets/theme';


const PaperError = styled(Paper)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    margin:'80px',
}));

const NotFound = () => {
    return (
        <Box sx={{ marginTop: 2, height: '100vh'}}>
            <PaperError>
                <ErrorIcon sx={{fontSize: 60, fill: theme.palette.error.main}}  />
            </PaperError>
        </Box>
    );
};

export default NotFound;
