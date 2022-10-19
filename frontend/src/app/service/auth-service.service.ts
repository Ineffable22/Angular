import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthI } from '../interfaces/auth';
import { UsersI } from '../interfaces/users';
import { TokenService } from './token.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt'

const helper = new JwtHelperService
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public tokenType = 'Bearer ';
  private loggedIn = new BehaviorSubject<boolean>(false);
  environment: any;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router,
    private cookieService: CookieService
    ) { }

  private profile = new BehaviorSubject<UsersI | null>(null);
  myProfile$ = this.profile.asObservable();

  get isLogged(): Observable<boolean> {
    console.log(this.loggedIn.asObservable())
    return this.loggedIn.asObservable();
  }

  private checkToken(): void {
    const userToken = this.cookieService.get('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired->', isExpired)
    if (isExpired) {
      this.logout()
    } else {
      this.loggedIn.next(true)
    }
  }

  login(username:string, password:string ) {
    const data = {
      "name": username,
      "password": password,
      "nickname": "",
      "team": "",
      "last_conection": ""
    }

    return this.http.post<AuthI>(environment.apiUrl + '/login', data)
    .pipe(
      tap(res => {
        this.tokenService.saveToken(res.access_token)
        this.loggedIn.next(true);
      })
    )
  }

  getProfile() {
    const header = new HttpHeaders().set('Authorization', this.tokenType + this.cookieService.get('token')); // may be localStorage/sessionStorage
    const headers = { headers: header };
    return this.http.get<UsersI>(environment.apiUrl + '/profile', headers)
  }

  logout() {
    this.tokenService.removeToken();
    this.loggedIn.next(false);
  }
}
