import { createAction, props } from '@ngrx/store';

import { IArtwork, ICreateArtwork, IUpdateArtwork } from '../../../interfaces/IArtwork.interface';
import { IFilters } from '../../../interfaces/IFilters.interface';
import { IError } from '../../../interfaces/IError.interface';


export const fetchArtworks = createAction(
  '[Artwork] Fetch Artworks',
  props<{ filters: IFilters }>()
);

export const fetchArtworksSuccess = createAction(
  '[Artwork] Fetch Artworks Success',
  props<{ artworks: IArtwork[] }>()
);

export const fetchArtworksFailure = createAction(
  '[Artwork] Fetch Artworks Failure',
  props<{ error: IError }>()
);

export const createArtwork = createAction(
  '[Artwork] Create Artwork',
  props<{ artwork: ICreateArtwork }>()
);

export const createArtworkSuccess = createAction(
  '[Artwork] Create Artwork Success',
  props<{ artwork: IArtwork }>()
);

export const createArtworkFailure = createAction(
  '[Artwork] Create Artwork Failure',
  props<{ error: IError }>()
);

export const selectArtwork = createAction(
  '[Artwork] Select Artwork',
  props<{ artworkId: string }>()
);

export const updateArtwork = createAction(
  '[Artwork] Update Artwork',
  props<{ artworkId: string, artwork: IUpdateArtwork }>()
);

export const updateArtworkSuccess = createAction(
  '[Artwork] Update Artwork Success',
  props<{ artworkId: string, artwork: IArtwork }>()
);

export const updateArtworkFailure = createAction(
  '[Artwork] Update Artwork Failure',
  props<{ error: IError }>()
);

export const deleteArtwork = createAction(
  '[Artwork] Delete Artwork',
  props<{ artworkId: string }>()
);

export const deleteArtworkSuccess = createAction(
  '[Artwork] Delete Artwork Success',
  props<{ artworkId: string }>()
);

export const deleteArtworkFailure = createAction(
  '[Artwork] Delete Artwork Failure',
  props<{ error: IError }>()
);
