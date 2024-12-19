import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from '../routing/service-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    RouterModule
  ]
})
export class ServiceModule { }
