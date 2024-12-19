import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyRoutingModule } from '../routing/apply-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplyRoutingModule,
    HttpClientModule
  ],
  
})
export class ApplyModule { }
