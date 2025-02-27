import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatGridList, MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable, Subject, take, takeUntil} from 'rxjs';

import { ArtworkFiltersComponent } from '../../common-ui/artwork-filters/artwork-filters.component';
import { ArtworkListComponent } from '../../common-ui/artwork-list/artwork-list.component';
import { DialogFormComponent } from '../../common-ui/dialog-form/dialog-form.component';
import { deleteArtwork, fetchArtworks } from '../../core/store/artwork/artwork.actions';
import { IArtwork } from '../../interfaces/IArtwork.interface';
import { IFilters } from '../../interfaces/IFilters.interface';
import { IError } from '../../interfaces/IError.interface';
import { AppState } from '../../core/store/artwork/artwork.state';
import {
  selectAllArtworks, selectArtworksError,
  selectArtworksLoading, selectSelectedArtwork
} from '../../core/store/artwork/artwork.selectors';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ArtworkFiltersComponent,
    ArtworkListComponent,
    DialogFormComponent,
    MatProgressSpinner,
    MatSnackBarModule,
    AsyncPipe,
    MatCard,
    MatGridListModule,
    MatCardTitle,
    MatCardContent,
    MatGridList,
    MatGridTile,
    MatButton,
    MatCardActions,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private store: Store<AppState> = inject(Store);
  private dialog: MatDialog = inject(MatDialog);

  private destroy$: Subject<void> = new Subject();

  artworks$: Observable<IArtwork[]> = this.store.select(selectAllArtworks);
  loading$: Observable<boolean> = this.store.select(selectArtworksLoading);
  error$: Observable<IError | null> = this.store.select(selectArtworksError);

  artworks: IArtwork[] = [];
  filters: IFilters = {};
  error: string = '';


  ngOnInit(): void {
    this.store.dispatch(fetchArtworks({ filters: this.filters }));

    this.artworks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((artworks: IArtwork[]): void => {
        this.artworks = artworks;
      });

    this.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error: IError | null): void => {
        if (error && error.message) {
          this.error = Array.isArray(error.message)
            ? error.message.join('\n')
            : 'Error';
        }
      });
  }



  applyFilters(filters: IFilters): void {
    this.filters = filters;
    this.store.dispatch(fetchArtworks({ filters: this.filters }));
  }

  onDeleteArtwork(): void {
    this.store.select(selectSelectedArtwork).pipe(
      take(1)
    ).subscribe((artwork: IArtwork | null): void => {
      if (artwork) {
        this.store.dispatch(deleteArtwork({ artworkId: artwork.id }));
      }
    });
  }

  onEditArtwork(): void {
    this.store.select(selectSelectedArtwork).pipe(
      take(1)
    ).subscribe((artwork: IArtwork | null): void  => {
      if (artwork) {
        this.dialog.open(DialogFormComponent, {
          data: { artwork }
        });
      }
    });
  }

  openCreateDialog(): void {
    this.dialog.open(DialogFormComponent);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
