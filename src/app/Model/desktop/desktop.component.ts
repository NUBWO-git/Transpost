import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,  
    MatListModule,
    NgIf,
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {
  activeMenu: string = 'home';
  isDrawerOpened: boolean = false;

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }

  toggleDrawer() {
    this.isDrawerOpened = !this.isDrawerOpened;
  }
}

