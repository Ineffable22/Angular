import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';


const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
    return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TOKEN)) {
      request = this.addToken(request);
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    console.log("AAAAA")
    console.log(token)
    if (token) {
      const authReq = request.clone({
        headers: request.headers
        .set('Authorization', `Bearer ${token}`),
      });
      console.log(authReq)
      return authReq;
    }

    return request;
  }
}