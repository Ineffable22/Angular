import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }
    cookieValue: string = "";
    saveToken(token: string) {
        this.cookieService.set('token', token);
        this.cookieValue = this.cookieService.get('token');
    }

    getToken()  {
        return this.cookieService.get('token');
    }

    removeToken() {
        this.cookieService.delete('token');
    }
}