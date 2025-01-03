import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingInComponent } from '../Model/sing-in/sing-in.component';

const routes: Routes = [
  {
    path: '',
    component: SingInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingInRoutingModule { }
