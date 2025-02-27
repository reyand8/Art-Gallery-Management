import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';

import {
  fetchArtworks, fetchArtworksSuccess, fetchArtworksFailure,
  createArtwork, createArtworkSuccess, createArtworkFailure,
  deleteArtwork, deleteArtworkSuccess, deleteArtworkFailure,
  updateArtwork, updateArtworkFailure, updateArtworkSuccess,
} from './artwork.actions';
import { ArtworkService } from '../../services/artwork.service';
import { IArtwork } from '../../../interfaces/IArtwork.interface';
import { IError } from '../../../interfaces/IError.interface';


@Injectable()
export class ArtworkEffects {
  private actions$ = inject(Actions);
  private artworkService = inject(ArtworkService);

  constructor() {}

  fetchArtworks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchArtworks),
      mergeMap(action =>
        this.artworkService.fetchArtworks(action.filters).pipe(
          map((response: IArtwork[] | IError) => {
            if ((response as IError).statusCode) {
              return fetchArtworksFailure({ error: response as IError });
            }
            return fetchArtworksSuccess({ artworks: response as IArtwork[] });
          })
        )
      )
    )
  );

  createArtwork$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArtwork),
      mergeMap(action =>
        this.artworkService.createArtwork(action.artwork).pipe(
          map((response: IArtwork | IError) => {
            if ((response as IError).statusCode) {
              return createArtworkFailure({ error: response as IError });
            }
            return createArtworkSuccess({ artwork: response as IArtwork });
          })
        )
      )
    )
  );

  deleteArtwork$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArtwork),
      mergeMap(action =>
        this.artworkService.deleteArtwork(action.artworkId).pipe(
          map((response: IArtwork | IError) => {
            console.log(response)
            if ((response as IError).statusCode) {
              return deleteArtworkFailure({ error: response as IError });
            }
            return deleteArtworkSuccess({ artworkId: action.artworkId });
          })
        )
      )
    )
  );

  updateArtwork$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArtwork),
      mergeMap((action) =>
        this.artworkService.updateArtwork(action.artworkId, action.artwork).pipe(
          map((response: IArtwork | IError) => {
            if ((response as IError).statusCode) {
              return updateArtworkFailure({ error: response as IError });
            }
            return updateArtworkSuccess({ artworkId: action.artworkId, artwork: response as IArtwork });
          })
        )
      )
    )
  );
}
