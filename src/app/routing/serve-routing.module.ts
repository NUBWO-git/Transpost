import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServeComponent } from '../Model/serve/serve.component';

const routes: Routes = [
  {
    path: '',
    component: ServeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServeRoutingModule { }
