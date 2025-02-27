import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

import { IArtwork, ICreateArtwork, IUpdateArtwork } from '../../interfaces/IArtwork.interface';
import { environment } from '../../../environment/environment';
import { IFilters } from '../../interfaces/IFilters.interface';
import { IError } from '../../interfaces/IError.interface';


@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private http: HttpClient = inject(HttpClient)
  private baseUrl: string = environment.baseApiUrl;
  constructor() {}

  private handleError(error: HttpErrorResponse): Observable<IError> {
    const { message, error: serverError } = error.error;
    const err: IError = {
      message,
      statusCode: error.status,
      error: serverError
    };
    return of(err);
  }

  fetchArtworks(filters: IFilters): Observable<IArtwork[] | IError> {
    let params: HttpParams = new HttpParams();

    if (filters.price) {
      params = params.set('price', filters.price);
    }
    if (filters.artist) {
      params = params.set('artist', filters.artist);
    }
    if (filters.type) {
      params = params.set('type', filters.type);
    }
    return this.http.get<IArtwork[]>(this.baseUrl, { params }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createArtwork(artwork: ICreateArtwork): Observable<IArtwork | IError> {
    return this.http.post<IArtwork>(this.baseUrl, artwork).pipe(
      catchError(error => {
        return this.handleError(error);
      })
    );
  }

  updateArtwork(artworkId: string, artwork: IUpdateArtwork): Observable<IArtwork | IError> {
    return this.http.put<IArtwork>(`${this.baseUrl}${artworkId}`, artwork).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteArtwork(id: string): Observable<IArtwork | IError> {
    return this.http.delete<IArtwork>(`${this.baseUrl}${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }
}
