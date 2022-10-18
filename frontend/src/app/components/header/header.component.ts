import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public data: string = "login";
  public width: number = 10;

  constructor(private http: HttpClient, private token: TokenService,
    private mov: AuthServiceService) { }
  
  ngOnInit( ): void {
    this.status()
  }
  status (): string {
    if (this.token.getToken() && this.token.getToken() !== 'Denied') {
      this.data = "logout"
      this.width = 30;
    } else {
      this.width = 10;
      this.data = "login"
    }
    return this.data
  }
  login(): void {
    this.data = "logout"
  }
  logout(): void {
    this.token.removeToken();
  }
}
