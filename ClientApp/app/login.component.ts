import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: '../assets/login.component.html',
  styleUrls: [ '../assets/login.component.css' ] 
})

export class LoginComponent {
  message: string;
  uname: string;
  pwd: string;
  constructor(
    public authService: AuthenticationService, 
    public router: Router) {};

  onSubmit() {
    this.authService.login(this.uname, this.pwd).subscribe(() => {
      if (this.authService.authguard.isLoggedIn) {
        let redirect = this.authService.authguard.redirectUrl ? this.authService.authguard.redirectUrl : '/dashboard';
        this.router.navigate([redirect]);
      }
      else
      {
        this.message = 'Login failed! Try again';
      }
    });
  }
}