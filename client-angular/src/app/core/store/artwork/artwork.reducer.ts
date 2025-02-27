import { createReducer, on } from '@ngrx/store';

import {
  fetchArtworksSuccess, fetchArtworksFailure,
  createArtworkSuccess, createArtworkFailure,
  fetchArtworks, updateArtworkSuccess, updateArtworkFailure,
  deleteArtworkSuccess, deleteArtworkFailure, selectArtwork
} from './artwork.actions';
import { IArtworkState } from '../../../interfaces/IArtworkState.interface';
import { IArtwork } from '../../../interfaces/IArtwork.interface';


const initialState: IArtworkState = {
  artworks: [],
  artwork: null,
  loading: false,
  error: null
};

export const ArtworkReducer = createReducer(
  initialState,
  on(fetchArtworks, (state: IArtworkState) => ({ ...state, loading: true })),
  on(fetchArtworksSuccess, (state: IArtworkState, { artworks }) => ({
    ...state,
    loading: false,
    artworks
  })),
  on(fetchArtworksFailure, (state: IArtworkState, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(createArtworkSuccess, (state: IArtworkState, { artwork }) => ({
    ...state,
    artworks: [...state.artworks, artwork]
  })),
  on(createArtworkFailure, (state: IArtworkState, { error }) => ({
    ...state,
    error
  })),

  on(selectArtwork, (state: IArtworkState, { artworkId }) => ({
    ...state,
    artwork: state.artworks.find((artwork: IArtwork): boolean  => artwork.id === artworkId) || null
  })),

  on(updateArtworkSuccess, (state: IArtworkState, { artworkId, artwork }) => ({
    ...state,
    artworks: state.artworks.map((art: IArtwork) =>
      art.id === artworkId ? { ...art, ...artwork } : art
    )
  })),
  on(updateArtworkFailure, (state: IArtworkState, { error }) => ({
    ...state,
    error
  })),

  on(deleteArtworkSuccess, (state: IArtworkState, { artworkId }) => ({
    ...state,
    artworks: state.artworks.filter((art: IArtwork): boolean => art.id !== artworkId),
    artwork: state.artwork && state.artwork.id === artworkId ? null : state.artwork
  })),
  on(deleteArtworkFailure, (state: IArtworkState, { error }) => ({
    ...state,
    error
  }))
);


