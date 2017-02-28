import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero'

@Injectable()
export class HeroService {
	private heroesUrl = 'api/heroes'; // URL to web api

	constructor(
		public authService: AuthenticationService,
		private http: Http) {}
	getHeroes(): Promise<Hero[]> {
		// return Promise.resolve(HEROES);
		return this.http.get(this.heroesUrl, {headers: this.jwt()})
				   .toPromise()
				   .then(response => response.json().data as Hero[])
				   .catch((err)=>this.handleError(err));
	}

	getHero(id: number): Promise<Hero> {
		// return this.getHeroes()
		// 			.then(heroes => heroes.find(hero => hero.id == id));
		
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get(url, {headers: this.jwt()})
				   .toPromise()
				   .then(response => response.json().data as Hero)
				   .catch((err)=>this.handleError(err));
	}

	update(hero: Hero): Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http
				   .put(url, JSON.stringify(hero), {headers: this.jwt()})
				   .toPromise()
				   .then(() => hero)
				   .catch((err)=>this.handleError(err));
	}

	create(name: string): Promise<Hero> {
		return this.http
				.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.jwt()})
				.toPromise()
				.then(res => res.json().data)
				.catch((err)=>this.handleError(err));
	}

	delete(id: number): Promise<void> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete(url, {headers: this.jwt()})
				.toPromise()
				.then(() => null)
				.catch((err)=>this.handleError(err));
	}

	private jwt() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser && currentUser.token){
			return new Headers(
				{'Authorization': 'Bearer ' + currentUser.token,
				'Content-Type': 'application/json'});
		}
	}

	handleError(error: any) {
   	console.error('An error occurred', error);
	if (error.status == 401)
	{
		alert(error.json()['message'])
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(currentUser)
		{
			localStorage.removeItem('currentUser');
            this.authService.isLoggedIn = false;
		}
        this.authService.router.navigate(['/login']);
	}
	else
		return Promise.reject(error.message || error);
  }
}