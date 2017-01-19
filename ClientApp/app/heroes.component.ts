import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service'

import { Router } from '@angular/router'

@Component({
	moduleId: module.id,
  	selector: 'my-heroes',
  	templateUrl: '../assets/heroes.component.html',
  	styles: [ '../assets/hereoes.component.css' ],
})

export class HeroesComponent implements OnInit {
	heroes: Hero[];
	selectedHero: Hero;

	constructor(
		private heroService: HeroService,
		private router: Router
		) {}

	ngOnInit(): void {
		this.getHeroes();
	}

	getHeroes(): void {
		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}
	//this.heroes = this.heroService.getHeroes(); //no need for method

	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

	gotoDetail(): void {
		this.router.navigate(['/detail', this.selectedHero.id])
	}
}
