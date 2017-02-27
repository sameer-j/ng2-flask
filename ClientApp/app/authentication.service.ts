import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard'

// import '../assets/jwt-decode.min.js';
import '../jwt-decode.min.js'
declare var jwt_decode: any;
@Injectable()
export class AuthenticationService {
  constructor(
    public authguard: AuthGuard, 
    private http: Http, 
    private router: Router) {}

  login(username: String, password: String) {

    return this.http.post('/api/login', JSON.stringify({
        uname: username,
        pwd: password
      }), {
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .map((response : Response) => {
        let res = response.json();
        if (res.user && res.token)
        {
          alert(JSON.stringify(jwt_decode(res.token)));
          // jwt_decode(res.token);
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.authguard.isLoggedIn = true;
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.authguard.isLoggedIn = false;
    this.router.navigate(['/login'])
  }
}