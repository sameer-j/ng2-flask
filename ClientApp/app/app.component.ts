import { Component } from '@angular/core'
import { CanActivate } from '@angular/router';
import { HeroService } from './hero.service';
import { AuthenticationService } from './authentication.service'

@Component({
  moduleId: module.id,
	selector: 'my-app',
	template: `
      <ng-container *ngIf="authentication.isLoggedIn">
  		<h1>{{title}}</h1>
      <button (click)="logout()">Logout</button>
  		<nav>
  			<a routerLink="dashboard" routerLinkActive="active">Dashboard</a>
  			<a routerLink="heroes" routerLinkActive="active">Heroes</a>
  		</nav>
      </ng-container>
      <router-outlet></router-outlet>
	`,
  styleUrls: [ '../assets/app.component.css' ]
})

export class AppComponent {
	title = 'Tour of Heroes';
  constructor(
    public authentication: AuthenticationService,
    private heroService: HeroService,
  ){}
  logout():any {
    this.authentication.logout();
  }
}