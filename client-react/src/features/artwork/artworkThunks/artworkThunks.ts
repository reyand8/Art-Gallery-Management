import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    handleAxiosError, fetchArtworks, createArtwork,
    getArtwork, updateArtwork, deleteArtwork } from '../artworkApi/artworkApi';

import { IFilters } from '../../../interfaces/IFilters.interface';
import { ICreateArtwork, IUpdateArtwork } from '../../../interfaces/IArtwork.interface';
import { IError } from '../../../interfaces/IError.interface';


type AsyncThunkAPI = { rejectWithValue: (value: IError) => void };

export const fetchArtworksThunk = createAsyncThunk(
    'artworks/fetchArtworks',
    async (filters: IFilters = {}, { rejectWithValue }: AsyncThunkAPI) => {
        try {
            const response = await fetchArtworks(filters);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error));
        }
    }
);

export const createArtworkThunk = createAsyncThunk(
    'artworks/createArtwork',
    async (artwork: ICreateArtwork, { rejectWithValue }: AsyncThunkAPI) => {
        try {
            const response = await createArtwork(artwork);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error));
        }
    }
);

export const getArtworkThunk = createAsyncThunk(
    'artworks/getArtwork',
    async (artworkId: string, { rejectWithValue }: AsyncThunkAPI) => {
        try {
            const response = await getArtwork(artworkId);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error));
        }
    }
);

export const updateArtworkThunk = createAsyncThunk(
    'artworks/updateArtwork',
    async ({ id, updatedData }: { id: string, updatedData: IUpdateArtwork },
           { rejectWithValue }: AsyncThunkAPI) => {
        try {
            const { title, artist, price, type, availability  } = updatedData
            const data: IUpdateArtwork = {
                title: title,
                artist: artist,
                price: price,
                type: type,
                availability: availability,
            };
            const response = await updateArtwork(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAxiosError(error));
        }
    }
);

export const deleteArtworkThunk = createAsyncThunk(
    'artworks/deleteArtwork',
    async (artworkId: string, { rejectWithValue }: AsyncThunkAPI) => {
        try {
            await deleteArtwork(artworkId);
            return { id: artworkId };
        } catch (error) {
            return rejectWithValue(handleAxiosError(error));
        }
    }
);
