import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';



@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor (private authService: AuthServiceService) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => !isLogged)
    );
  }
  
}
