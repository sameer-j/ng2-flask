import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service'
@Injectable()
export class AuthGuard implements CanActivate {
    // isLoggedIn: boolean;
    redirectUrl: string;

    constructor(private router: Router,
        private authService: AuthenticationService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url:string = state.url;
        if(!this.checkLogin(route.data["role"]))
        {
            this.router.navigate(['/login'], { queryParams: { returnUrl: url}});
            return false;
        }
        else
            return true
    }

  checkLogin(role:any): boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(currentUser && 
        this.authService.authenticate_user(currentUser))
    {
        let currentUserRole = currentUser['role'];
        if(role != null && role != currentUserRole)
        {
            alert('Role Unauthorised')
            this.authService.isLoggedIn = false;
            return false;
        }

        this.authService.isLoggedIn = true;
        return true; 
    }
    return false;
  }
}