import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../routing/app-routing.module';
import { HomeModule } from './home.module';
import { HomeComponent } from '../Model/home/home.component';
import { HomePageComponent } from '../Model/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { AboutComponent } from '../Model/about/about.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HomeModule,
    HomeComponent,
    HomePageComponent,
    AboutComponent,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideHttpClient(withFetch())  
  ],
  bootstrap: []
})
export class AppModule { }
