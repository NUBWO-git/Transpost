import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from '../Model/desktop/desktop.component';

const routes: Routes = [
  {
    path: '',
    component: DesktopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesktopRoutingModule { }
