import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent},
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
	{ path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard]},
	{ path: 'detail/:id', component: HeroDetailComponent, canActivate: [AuthGuard]}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {}