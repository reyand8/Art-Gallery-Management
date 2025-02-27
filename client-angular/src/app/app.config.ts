import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { ArtworkEffects } from './core/store/artwork/artwork.effects';
import { ArtworkReducer } from './core/store/artwork/artwork.reducer';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode()}),
    provideRouter(routes),
    provideStore({ artworks: ArtworkReducer }),
    provideEffects([ArtworkEffects]),
  ]
};
