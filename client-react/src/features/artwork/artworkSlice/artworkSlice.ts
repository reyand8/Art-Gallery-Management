import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArtworksState } from '../../../interfaces/IArtworksState.interface';
import { IError } from '../../../interfaces/IError.interface';
import {
    createArtworkThunk, deleteArtworkThunk,
    fetchArtworksThunk,
    getArtworkThunk,
    updateArtworkThunk
} from '../artworkThunks/artworkThunks';


const initialState: IArtworksState = {
    artworks: [],
    artwork: null,
    loading: false,
    error: null,
};

const handlePending = (state: IArtworksState): void => {
    state.loading = true;
    state.error = null;
};

const handleFulfilled = (state: IArtworksState, action: PayloadAction<any>): void  => {
    state.loading = false;
    if (Array.isArray(action.payload)) {
        state.artworks = action.payload;
    } else {
        state.artwork = action.payload;
    }
};

const handleRejected = (state: IArtworksState, action: PayloadAction<any>): void  => {
    state.loading = false;
    state.error = action.payload as IError;
};

const artworksSlice = createSlice({
    name: 'artworks',
    initialState,
    reducers: {},
    extraReducers: (builder): void  => {
        builder
            .addCase(fetchArtworksThunk.pending,
                (state) => handlePending(state))
            .addCase(fetchArtworksThunk.fulfilled,
                (state, action) => handleFulfilled(state, action))
            .addCase(fetchArtworksThunk.rejected,
                (state, action) => handleRejected(state, action))
            .addCase(createArtworkThunk.pending,
                (state) => handlePending(state))
            .addCase(createArtworkThunk.fulfilled,
                (state, action) => {
                state.loading = false;
                state.artworks.push(action.payload);
            })
            .addCase(createArtworkThunk.rejected,
                (state, action) => handleRejected(state, action))
            .addCase(getArtworkThunk.pending,
                (state) => handlePending(state))
            .addCase(getArtworkThunk.fulfilled,
                (state, action) => handleFulfilled(state, action))
            .addCase(getArtworkThunk.rejected,
                (state, action) => handleRejected(state, action))
            .addCase(updateArtworkThunk.pending,
                (state) => handlePending(state))
            .addCase(updateArtworkThunk.fulfilled,
                (state, action) => {
                state.loading = false;
                state.artworks = state.artworks.map(artwork =>
                    artwork.id === action.payload.id ? action.payload : artwork
                );
            })
            .addCase(updateArtworkThunk.rejected,
                (state, action) => handleRejected(state, action))
            .addCase(deleteArtworkThunk.pending,
                (state) => handlePending(state))
            .addCase(deleteArtworkThunk.fulfilled,
                (state, action) => {
                state.loading = false;
                state.artworks = state.artworks.filter(artwork => artwork.id !== action.payload?.id);
            })
            .addCase(deleteArtworkThunk.rejected,
                (state, action) => handleRejected(state, action));
    },
});

export default artworksSlice.reducer;
