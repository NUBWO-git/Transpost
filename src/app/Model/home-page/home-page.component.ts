import { Component, Inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SingInComponent } from "../sing-in/sing-in.component";
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  
}
