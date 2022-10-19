import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';
import { map, switchMap, tap } from 'rxjs';
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
  public element_dataSlice: PokeTableI[] = [];
  paginatorOptions: any = {
    length: 0,
    pageSize: 5,
    pageIndex: 0,
    pageSizeOptions: [5, 10, 15]
  }
  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.element_data.length) {
      endIndex = this.element_data.length;
    }

    this.element_dataSlice = this.element_data.slice(startIndex, endIndex);
    this.paginatorOptions.pageSize = event.pageSize;
  }

  constructor( private http: HttpClient, private cookieService: CookieService ) { }

  ngOnInit(): void {
    this.profile()
    this.element_dataSlice = this.element_data.slice(0, 5);
  }

  profile(): void {
    const header = new HttpHeaders().set('authorization', this.tokenType + this.cookieService.get('token')); // may be localStorage/sessionStorage
    const headers = { headers: header };
    this.http.get(environment.apiUrl + "/profile", headers)
    .pipe(
      map((res: any) => {
        this.dataProfile = res[0];
        this.pokeNumber = this.dataProfile.pokemones.length;
        this.paginatorOptions.length = this.dataProfile.pokemones.length;
        this.getPokeByProfile(this.dataProfile.pokemones);
        return res
      }),
      tap((res: any) => this.element_dataSlice = this.element_data.slice(0, 5))
    )
    .subscribe();
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
