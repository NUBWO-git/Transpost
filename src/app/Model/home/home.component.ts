import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { HomePageComponent } from '../home-page/home-page.component';
import { AboutComponent } from '../about/about.component';
import { ServiceComponent } from '../service/service.component';
import { ContactComponent } from '../contact/contact.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTabsModule,
    HomePageComponent,
    AboutComponent,
    ServiceComponent,
    ContactComponent,
    RouterModule

],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  activeTab: number = 0;
  currentPage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.currentPage = params.get('id') || '';
      this.updateActiveTab();
    })
  }

  updateActiveTab(): void{
    switch(this.currentPage) {
      case 'HomePage':
        this.activeTab = 0;
        break;
      case 'About' :
        this.activeTab = 1;
        break;
      case 'Services' :
        this.activeTab = 2;
        break;
      case 'Contact' : 
        this.activeTab = 3;
        break;
      default:
        this.activeTab = 0;
    }
  }
}
