import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  isLoggedIn: boolean;
  constructor(
    private http: Http, 
    public router: Router) {}

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
        if (res.userid && res.token)
        {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.isLoggedIn = true;
        }
      });
  }

  logout() {
    let headers: any;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token){
      headers = new Headers(
        {'Authorization': 'Bearer ' + currentUser.token,
        'Content-Type': 'application/json'});
      return this.http.get('/api/logout', {headers:headers})
            .toPromise()
            .then(() => {
              localStorage.removeItem('currentUser');
              this.isLoggedIn = false;
              this.router.navigate(['/login'])
            })
            .catch((err)=>this.handleError(err))
    }
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    return true;
  }

  authenticate_user(currentUser:any): Promise<boolean> {
    let headers = new Headers(
        {'Authorization': 'Bearer ' + currentUser.token,
        'Content-Type': 'application/json'});
  return this.http.post('/api/authenticate_user', 
                         currentUser,
                         {headers:headers})
                  .toPromise()
                  .then(() => true)
                  .catch((err)=>this.handleError(err))
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
            this.isLoggedIn = false;
    }
        this.router.navigate(['/login']);
  }
  else
    return Promise.reject(error.message || error);
  }
}