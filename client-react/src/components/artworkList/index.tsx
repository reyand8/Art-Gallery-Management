import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid2';
import {Box, Button, Typography} from '@mui/material';

import { deleteArtworkThunk } from '../../features/artwork/artworkThunks/artworkThunks';
import { IArtwork } from '../../interfaces/IArtwork.interface';
import { AppDispatch } from '../../features/store';
import ArtworkItem from '../artworkItem';
import ArtworkForm from '../artworkForm';
import theme from '../../assets/theme';


interface IArtworkListProps {
    artworks: IArtwork[];
}

const ArtworkList: React.FC<IArtworkListProps> = ({ artworks }) => {
    const dispatch: AppDispatch = useDispatch();

    const [selectedArtwork, setSelectedArtwork] =
        useState<string | undefined>();
    const [showModal, setShowModal] = useState<boolean>(false)

    const selectedArtworkData: IArtwork | undefined = artworks.find((el) => el.id === selectedArtwork);

    const handleSelectArtwork = (artworkId: string): void => {
        setSelectedArtwork(artworkId);
    };

    const handleDelete = (): void => {
        if (selectedArtwork) {
            dispatch(deleteArtworkThunk(selectedArtwork));
            setSelectedArtwork(undefined);
        }
    };

    const handleCloseModal = (): void => {
        setShowModal(false);
        setSelectedArtwork(undefined);
    };

    const handleUpdate = (): void => {
        if (selectedArtwork) {
            setShowModal(true)
        }
    };

    const handleCreate = (): void => {
        setShowModal(true)
    };

    return (
        <>
            {showModal && (
                <ArtworkForm
                    artwork={selectedArtworkData}
                    onClose={handleCloseModal}
                />
            )}
             <Box sx={{
                 my: '20px',
                 [theme.breakpoints.down('sm')]: {
                     display: 'flex',
                     gap: '10px',
                     flexDirection: 'column',
                 },
             }}>
                 <Button  sx={{background: theme.palette.primary.light, mx:'10px'}} onClick={handleCreate}>Create</Button>
                 <Button  sx={{background: theme.palette.primary.light, mx:'10px'}} onClick={handleUpdate}>Edit</Button>
                 <Button type="submit"
                         variant="contained"
                         sx={{background: theme.palette.error.main, mx:'10px'}}
                         onClick={handleDelete}>
                     Delete
                 </Button>
            </Box>
            <Grid size={12} container>
                {artworks.length === 0 ? (
                    <Typography sx={{
                        color: theme.palette.text.secondary,
                        paddingLeft: '10px', my: '36px'
                    }} variant="h6">List is empty</Typography>
                ) : (
                    artworks.slice(0, 4).map((artwork: IArtwork) => (
                        <Grid key={artwork.id}>
                            <ArtworkItem
                                artwork={artwork}
                                selectedArtwork={selectedArtwork}
                                handleSelectArtwork={handleSelectArtwork}
                            />
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
};

export default ArtworkList;
