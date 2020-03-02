import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
    
  ],
  exports: [MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule]
})
export class AngularmaterialModule { }
