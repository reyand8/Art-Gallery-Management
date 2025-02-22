import axios, { AxiosInstance, AxiosError } from 'axios';

import { ICreateArtwork, IUpdateArtwork } from '../../../interfaces/IArtwork.interface';
import { API_ARTWORKS_URL } from '../../../constants/apiUrl';
import { IError } from '../../../interfaces/IError.interface';
import { IFilters } from '../../../interfaces/IFilters.interface';


const api: AxiosInstance = axios.create({
    baseURL: API_ARTWORKS_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const handleAxiosError = (error: unknown): IError => {
    if (error instanceof AxiosError) {
        return {
            message: error.message,
            statusCode: error.response?.status,
            error: error.response?.data,
        };
    }
    return { message: 'Unknown error' };
};

export const fetchArtworks = (filters: IFilters) => {
    return api.get('', { params: filters });
};

export const createArtwork = (artwork: ICreateArtwork) => {
    return api.post('', artwork);
};

export const getArtwork = (artworkId: string) => {
    return api.get(`${artworkId}`);
};

export const updateArtwork = (id: string, updatedData: IUpdateArtwork) => {
    return api.put(`${id}`, updatedData);
};

export const deleteArtwork = (artworkId: string) => {
    return api.delete(`${artworkId}`);
};
