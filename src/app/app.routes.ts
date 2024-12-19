import { Routes } from '@angular/router';
import { HomeComponent } from './Model/home/home.component';

export const routes: Routes = [
   {
      path: '',
      redirectTo: 'welcome_Transpost/HomePage',
      pathMatch: 'full'
   },
   {
      path: 'welcome_Transpost/HomePage',
      component: HomeComponent,
      children: [
         {
            path: 'homepage',
            loadChildren: () => import('./Module/home-page.module').then(m => m.HomePageModule)
         },
         {
            path: 'about',
            loadChildren: () => import('./Module/about.module').then(m => m.AboutModule)
         },
         {
            path: 'services',
            loadChildren: () => import('./Module/service.module').then(m => m.ServiceModule)
         },
         {
            path: 'contact',
            loadChildren: () => import('./Module/contact.module').then(m => m.ContactModule)
         },
      ]
   },
   {
      path: 'welcome_Transpost/sign-in',
      loadChildren: () => import('./Module/sing-in.module').then(m => m.SingInModule)
   },
   {
      path: 'welcome_Transpost/apply',
      loadChildren: () => import('./Module/apply.module').then(m => m.ApplyModule)
   },
   {
      path: 'TRANSPOST',
      loadChildren: () => import('./Module/desktop.module').then(m => m.DesktopModule)
   },
   {
      path: '**',
      redirectTo: 'welcome_Transpost/HomePage',
      pathMatch: 'full'
   }
];
