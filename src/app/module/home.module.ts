import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from '../routing/home-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule
  ]
})
export class HomeModule { }
