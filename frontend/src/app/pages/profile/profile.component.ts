import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PokeTableI } from 'src/app/interfaces/table';
import { UsersI } from 'src/app/interfaces/users';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public tokenType = 'Bearer ';
  public dataProfile: UsersI = {
    "_id": "id",
    "name": "name",
    "password": "password",
    "nickname": "nickname",
    "team": "",
    "last_conection": "",
    "__v": 0,
    "pokemones": []
  };
  public pokeNumber: Array<number> = [];
  public element_data: PokeTableI[] = [];
  constructor( private http: HttpClient, private cookieService: CookieService ) { }

  ngOnInit(): void {
    this.profile()
  }

  profile(): void {
    const header = new HttpHeaders().set('authorization', this.tokenType + this.cookieService.get('token')); // may be localStorage/sessionStorage
    const headers = { headers: header };
    this.http.get(environment.apiUrl + "/profile", headers)
    .subscribe((res: any) => {
      this.dataProfile = res[0];
      this.pokeNumber = this.dataProfile.pokemones.length
      this.getPokeByProfile(this.dataProfile.pokemones);
    });
  }
  
  getPokeByProfile(number: number[]) {
    number.map((pokeId, index) => {
      this.element_data.push(this.pokeDataTransform(pokeId, index))
    });
  }

  pokeDataTransform(pokeId: number, index: number): PokeTableI {
    let pokeData = {
      name: "",
      position: index + 1,
      ID: pokeId,
      tipo: "",
    }
    this.getPokeAPI(pokeId)
    .subscribe((res: any) => {
      pokeData.name = res.forms[0].name;
      pokeData.tipo = res.types[0].type.name;
    });
    return pokeData
  }

  getPokeAPI(id: number): any {
    return (this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
  }
}
