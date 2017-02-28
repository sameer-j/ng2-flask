import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }	 from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from './hero-search.component';
import { LoginComponent } from './login.component';
import { HeroService } from './hero.service';
import { AuthenticationService } from './authentication.service'
import { AuthGuard } from './auth.guard'

import { AppRoutingModule } from './app-routing.module'

@NgModule({
  imports: [ 
  		BrowserModule,
  		FormsModule,
      HttpModule,
  		AppRoutingModule
  ],
  declarations: [ 
  		AppComponent, 
  		HeroDetailComponent, 
  		HeroesComponent,
  		DashboardComponent,
      HeroSearchComponent,
      LoginComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ HeroService, AuthenticationService, AuthGuard]
})

export class AppModule { }
