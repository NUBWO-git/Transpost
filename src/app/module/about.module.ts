import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from '../routing/about-routing.module';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutModule { }
