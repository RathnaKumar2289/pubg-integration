import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor(private snackBar: MatSnackBar) {
  }

  showError(error) {
    console.log(error);
    this.snackBar.open("Service Not Available.Try After Sometime!", "", {
      duration: 2000
    });
  }
}
