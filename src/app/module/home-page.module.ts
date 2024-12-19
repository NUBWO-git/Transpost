import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomePageRoutingModule } from '../routing/home-page-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    RouterModule
  ]
})
export class HomePageModule { }
