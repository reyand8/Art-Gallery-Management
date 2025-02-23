import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import ArtworkList from '../../components/artworkList';
import ArtworkFilters from '../../components/artworkFilters';
import { IFilters } from '../../interfaces/IFilters.interface';
import { AppDispatch, RootState } from '../../features/store';
import theme from '../../assets/theme';
import { fetchArtworksThunk } from '../../features/artwork/artworkThunks/artworkThunks';

/**
 * Home Component
 *
 * Displays the main art gallery page, including filters, artwork list,
 * and loading/error states.
 * Utilizes Redux for state management and Material-UI for styling.
 */
const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const [filters, setFilters] =
        useState<IFilters>({})

    const { artworks, loading, error } =
        useSelector((state: RootState) => state.artworks);

    /**
     * Loads artworks based on current filters.
     *
     * @param {IFilters | {}} filters - Filters for fetching artworks.
     */
    const loadArtworks = useCallback((filters: IFilters | {}) => {
        dispatch(fetchArtworksThunk(filters));
    }, [dispatch]);

    /**
     * Loads saved filters from local storage when the component mounts.
     */
    useEffect((): void => {
        const savedFilters: string| null = localStorage.getItem('artworkFilters');
        if (savedFilters) {
            setFilters(JSON.parse(savedFilters));
        }
    }, []);

    /**
     * Triggers loading of artworks whenever filters change.
     */
    useEffect((): void => {
        loadArtworks(filters);
    }, [filters, loadArtworks]);

    return (
        <Box sx={{marginTop: '40px', marginLeft: '40px',
            [theme.breakpoints.down('sm')]: {
                marginLeft: '10px',
            },}}>
            <Typography sx={{ color: theme.palette.text.primary }} variant="h2" component="h2">
                Art Gallery
            </Typography>
            <Grid container sx={{ my: 4 }}>
                <Grid size={10}>
                    <ArtworkFilters filters={filters} setFilters={setFilters} />
                </Grid>
                <Grid size={10}>
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {error && (
                        <Box sx={{ marginTop: '20px' }}>
                            <Alert severity="error">{error.message || 'Error'}</Alert>
                        </Box>
                    )}
                    {!loading && !error && artworks && <ArtworkList artworks={artworks} />}
                </Grid>
            </Grid>
        </Box>
    );
};


export default Home;