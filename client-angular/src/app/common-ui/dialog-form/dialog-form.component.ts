import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose,
  MatDialogContent, MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatCardContent } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { ICreateArtwork, IUpdateArtwork } from '../../interfaces/IArtwork.interface';
import { createArtwork, updateArtwork } from '../../core/store/artwork/artwork.actions';
import { AppState } from '../../core/store/artwork/artwork.state';
import { IDialogData } from '../../interfaces/IDialogData.interface';


@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatDialogTitle,
    ReactiveFormsModule,
    NgIf,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardContent
  ],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
  private store: Store<AppState> = inject(Store);
  private dialogRef: MatDialogRef<DialogFormComponent> = inject(MatDialogRef);
  private data: IDialogData = inject(MAT_DIALOG_DATA);

  artworkForm: FormGroup;

  constructor() {
    this.artworkForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(99)
      ]),
      artist: new FormControl('', Validators.required),
      type: new FormControl('painting', [
        Validators.required,
        Validators.pattern(/^(painting|sculpture)$/)
      ]),
      price: new FormControl(0, [
        Validators.required,
        Validators.min(0.01),
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
      availability: new FormControl(true),
    });
    if (this.data && this.data.artwork) {
      this.artworkForm.patchValue(this.data.artwork);
    }
  }


  onSubmit(): void {
    if (this.artworkForm.valid) {
      if (this.data && this.data.artwork.id) {
        const artwork: IUpdateArtwork = this.artworkForm.value;
        this.store.dispatch(updateArtwork({artworkId: this.data.artwork.id, artwork}));
      } else {
        const artwork: ICreateArtwork = this.artworkForm.value;
        this.store.dispatch(createArtwork({ artwork }));
      }
      this.dialogRef.close();
    }
  }
}
