import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AuthI } from 'src/app/interfaces/auth';
import { UsersI } from 'src/app/interfaces/users';
import { AuthServiceService } from 'src/app/service/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public users!: UsersI[];
  username = new FormControl('');
  password = new FormControl('');
  
  hide = true;
  constructor(
    private http: HttpClient,
    private fb:FormBuilder, 
    private authService: AuthServiceService, 
    private router: Router) {}
    
    ngOnInit(): void {
    }
    
  login(): void {
      if (this.username.value && this.password.value){
        this.authService.login(this.username.value, this.password.value)
        .pipe(
          switchMap((res: AuthI) => {
            if (res.access_token === 'Denied')
                alert("No se encontró usuario o contraseña")
            return this.authService.getProfile();
        }))
        .subscribe(
            () => {
                console.log("User is logged in");
                this.router.navigateByUrl('/');
            }
        );
      }
  };
}
