import { createSelector } from '@ngrx/store';

import { AppState } from './artwork.state';
import { IArtworkState } from '../../../interfaces/IArtworkState.interface';


export const selectAllArtworks = createSelector(
  (state: AppState) => state.artworks,
  (artworks: IArtworkState) => artworks?.artworks
);

export const selectSelectedArtwork = createSelector(
    (state: AppState) => state.artworks,
    (artworks: IArtworkState) => artworks?.artwork
);

export const selectArtworksLoading = createSelector(
  (state: AppState) => state.artworks,
  (artworks: IArtworkState) => artworks?.loading || false
);

export const selectArtworksError = createSelector(
  (state: AppState) => state.artworks,
  (artworks: IArtworkState) => artworks?.error || null
);
