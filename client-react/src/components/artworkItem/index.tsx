import React from 'react';
import {Box, Paper, styled, Typography} from '@mui/material';

import { IArtwork } from '../../interfaces/IArtwork.interface';
import notFound from '../../assets/img/notFound.jpg'
import soldOut from '../../assets/img/soldOut.jpg'
import theme from "../../assets/theme";


interface IArtworkItemProps {
    artwork: IArtwork;
    selectedArtwork: string | undefined;
    handleSelectArtwork: (artworkId: string) => void;
}

const ItemTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary
}));

const ArtworkItem: React.FC<IArtworkItemProps> = ({ artwork, selectedArtwork, handleSelectArtwork }) => {
    const isSelected: boolean = artwork.id === selectedArtwork
    return (
        <Paper onClick={() => handleSelectArtwork(artwork.id)}
            sx={{
                border: isSelected ? '2px solid gray' : '1px solid gray',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                filter: artwork.availability ? 'none' : 'brightness(50%)',
                padding: '10px',
                margin: '10px',
                cursor: 'pointer',
                width: '346px',
                [theme.breakpoints.down('sm')]: {
                    maxWidth: '240px',
                },
            }}
        >
            <Box
                component="img"
                src={artwork.availability ? notFound : soldOut}
                alt="Artwork"
                sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '10px',
                }}
            />
            <Box>
                <ItemTypography variant="h6">{artwork.title}</ItemTypography>
                <ItemTypography variant="body2">Artist: {artwork.artist}</ItemTypography>
                <ItemTypography variant="body2">Type: {artwork.type}</ItemTypography>
                <ItemTypography variant="body2">Price: ${artwork.price}</ItemTypography>
                <ItemTypography variant="body2">
                    Availability: {artwork.availability ? 'For Sale' : 'Sold out'}
                </ItemTypography>
            </Box>
        </Paper>
    );
};

export default ArtworkItem;
