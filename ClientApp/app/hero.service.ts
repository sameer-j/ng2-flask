import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero'

@Injectable()
export class HeroService {
	private heroesUrl = 'api/heroes'; // URL to web api
	// private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) {}
	getHeroes(): Promise<Hero[]> {
		// return Promise.resolve(HEROES);
		return this.http.get(this.heroesUrl, {headers: this.jwt()})
				   .toPromise()
				   .then(response => response.json().data as Hero[])
				   .catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); //for demo purposes only
		if (error.status == 401)
			alert('Unauthorised');
		return Promise.reject(error.message || error);
	}

	getHero(id: number): Promise<Hero> {
		// return this.getHeroes()
		// 			.then(heroes => heroes.find(hero => hero.id == id));
		
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get(url, {headers: this.jwt()})
				   .toPromise()
				   .then(response => response.json().data as Hero)
				   .catch(this.handleError);
	}

	update(hero: Hero): Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http
				   .put(url, JSON.stringify(hero), {headers: this.jwt()})
				   .toPromise()
				   .then(() => hero)
				   .catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
		return this.http
				.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.jwt()})
				.toPromise()
				.then(res => res.json().data)
				.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete(url, {headers: this.jwt()})
				.toPromise()
				.then(() => null)
				.catch(this.handleError);
	}

	private jwt() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser && currentUser.token){
			return new Headers(
				{'Authorization': 'Bearer ' + currentUser.token,
				'Content-Type': 'application/json'});
		}
	}
}