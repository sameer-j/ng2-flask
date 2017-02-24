import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
    isLoggedIn: boolean = false;
    redirectUrl: string;

    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url:string = state.url;
        return this.checkLogin(url);
    }

  checkLogin(url: string): boolean {
    if (this.isLoggedIn && localStorage.getItem('currentUser')) 
        { return true; }

    //store the attempted url for redirecting
    this.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}