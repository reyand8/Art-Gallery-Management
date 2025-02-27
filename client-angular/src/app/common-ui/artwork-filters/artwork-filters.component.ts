import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

import { IFilters, ISavedFilters } from '../../interfaces/IFilters.interface';


@Component({
  selector: 'app-artwork-filters',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatOption,
    MatSelect,
    MatButton,
    FormsModule,
    MatInput,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions
  ],
  templateUrl: './artwork-filters.component.html',
  styleUrl: './artwork-filters.component.scss'
})
export class ArtworkFiltersComponent {
  filterArtist: string = '';
  filterType: '' | 'painting' | 'sculpture' = '';
  sortOrder: '' | 'ASC' | 'DESC' = 'ASC';

  @Output() filtersChanged: EventEmitter<IFilters> = new EventEmitter<IFilters>();

  ngOnInit(): void {
    this.loadFiltersFromLocalStorage();
  }

  applyFilters(): void {
    const filters: any = {};
    if (this.filterArtist.trim()) filters.artist = this.filterArtist;
    if (this.filterType) filters.type = this.filterType;
    filters.price = this.sortOrder;
    this.filtersChanged.emit(filters);
    this.saveFiltersToLocalStorage();
  }

  resetFilters(): void {
    this.filterArtist = '';
    this.filterType = '';
    this.sortOrder = 'ASC';
    this.applyFilters();
    localStorage.removeItem('artworkFilters');
  }
  private saveFiltersToLocalStorage(): void {
    const filters: ISavedFilters = {
      artist: this.filterArtist,
      type: this.filterType,
      sortOrder: this.sortOrder
    };
    localStorage.setItem('artworkFilters', JSON.stringify(filters));
  }

  private loadFiltersFromLocalStorage(): void {
    const savedFilters: string | null = localStorage.getItem('artworkFilters');
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      this.filterArtist = filters.artist || '';
      this.filterType = filters.type || '';
      this.sortOrder = filters.sortOrder || 'ASC';
      this.applyFilters();
    }
  }
}
