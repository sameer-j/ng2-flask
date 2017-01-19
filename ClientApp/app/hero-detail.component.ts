import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Hero } from './hero'
import { HeroService } from './hero.service';

@Component({
	moduleId: module.id,
	selector: 'my-hero-detail',
	templateUrl: '../assets/hero-detail.component.html',
	styleUrls: [ '../assets/hero-detail.component.css' ]
})


export class HeroDetailComponent implements OnInit{
	hero: Hero;
	
	constructor(
	  private heroService: HeroService,
	  private route: ActivatedRoute,
	  private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.heroService.getHero(+params['id']))
			.subscribe(hero => this.hero = hero);
	}

	goBack(): void {
		this.location.back();
	}
}