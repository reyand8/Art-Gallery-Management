import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Alert, Box, CircularProgress, styled, Typography} from '@mui/material';
import Grid from '@mui/material/Grid2';

import ArtworkList from '../../components/artworkList';
import ArtworkFilters from '../../components/artworkFilters';
import { IFilters } from '../../interfaces/IFilters.interface';
import { AppDispatch, RootState } from '../../features/store';
import theme from '../../assets/theme';
import { fetchArtworksThunk } from '../../features/artwork/artworkThunks/artworkThunks';


const BoxError = styled(Box)(() => ({
    marginTop: '20px',
    height: '100vh',
    [theme.breakpoints.down('md')]: {
        maxWidth: '530px',
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '260px',
    },
}));

const BoxLoading = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
}));


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
    const loadArtworks = useCallback((filters: IFilters | {}): void => {
        dispatch(fetchArtworksThunk(filters));
    }, [dispatch]);

    /**
     * Constructs a formatted error message from the `error` object.
     * If the error contains a `message` array, it joins the messages with a newline character.
     * If it's a string, it directly uses the string as the error message.
     * If no `message` is available, it falls back to the `error` property or defaults to 'Error'.
     *
     * @returns {string} - The formatted error message.
     */
    const errorMessages: string = error && error.message
        ? Array.isArray(error.message)
            ? error.message.join('\n')
            : error.message
        : error?.error || 'Error';

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
                        <BoxLoading>
                            <CircularProgress />
                        </BoxLoading>
                    )}
                    {error && (
                        <BoxError>
                            <Alert severity="error">
                                <pre>{errorMessages}</pre>
                            </Alert>
                        </BoxError>
                    )}
                    {!loading && !error && artworks && <ArtworkList artworks={artworks} />}
                </Grid>
            </Grid>
        </Box>
    );
};


export default Home;