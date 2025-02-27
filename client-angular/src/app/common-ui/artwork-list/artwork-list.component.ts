import { Component, inject, Input } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { Store } from '@ngrx/store';

import {IArtwork} from '../../interfaces/IArtwork.interface';
import { selectArtwork } from '../../core/store/artwork/artwork.actions';
import { AppState } from '../../core/store/artwork/artwork.state';


@Component({
  selector: 'app-artwork-list',
  standalone: true,
  imports: [
    MatCard,
    NgIf,
    NgForOf,
    MatCardTitle,
    MatCardContent,
    NgClass
  ],
  templateUrl: './artwork-list.component.html',
  styleUrl: './artwork-list.component.scss'
})
export class ArtworkListComponent {
  private store: Store<AppState> = inject(Store);

  @Input() artworks: IArtwork[] = [];
  selectedArtworkId: string | null = null;

  onSelectArtwork(artworkId: string): void {
    this.selectedArtworkId = artworkId;
    this.store.dispatch(selectArtwork({ artworkId }));
  }
}
