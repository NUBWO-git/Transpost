import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-apply-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './apply-dialog.component.html',
  styleUrl: './apply-dialog.component.scss'
})
export class ApplyDialogComponent {

}
