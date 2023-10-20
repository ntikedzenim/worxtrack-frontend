import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {

  constructor(private matSnackBar: MatSnackBar) { }
  openSnackBar(message: string, varable: string, action: string, duration?: number) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-snack'];
    this.matSnackBar.open(message, action, { duration });
  }
}