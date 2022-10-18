import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbilityObjI } from 'src/app/interfaces/abilities';
import { namePokemonFormI } from 'src/app/interfaces/namePokemon';
import { StatsI } from 'src/app/interfaces/stats';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AllPokemonsI } from 'src/app/interfaces/allPokemons';
import { TypesI } from 'src/app/interfaces/types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  public imageUrl!: string;
  public imageUrlGif!: string;
  public abilitiesGet!: AbilityObjI[];
  public actualId: number = 1;
  public namePokemon!: namePokemonFormI;
  public width: number = 0;
  public statsBase!: StatsI[];
  public pokemons!: AllPokemonsI[];
  public types!: TypesI[];
  public height!: number;

  indexChange: boolean = false;
  control = new FormControl('');
  options: string[] = [];
  filteredPokemons?: Observable<string[]>;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.allPokemon()
    this.filteredPokemons = this.control.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value || '')
      }));
    this.poke(this.actualId);
    this.abilities(this.actualId);
    this.name(this.actualId);
    this.stats(this.actualId);
    this.type(this.actualId);
    this.heights(this.actualId);
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  allPokemon(): void {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154`)
    .subscribe((res: any) => {
      this.pokemons = res.results
      this.options = res.results.map((rs: any) => {
        return rs.name
      });
    });
  };

  prevPokemon(): void {
    if (this.actualId > 1) {
      this.actualId--;
      this.poke(this.actualId);
      this.abilities(this.actualId);
      this.name(this.actualId);
      this.stats(this.actualId);
      this.type(this.actualId);
      this.heights(this.actualId);
    }
  };

  nextPokemon(): void {
    this.actualId++;
    this.poke(this.actualId);
    this.abilities(this.actualId);
    this.name(this.actualId);
    this.stats(this.actualId);
    this.type(this.actualId);
    this.heights(this.actualId);
  };

  poke(id: number): void {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .subscribe((res: any) => {
        this.imageUrlGif = res.sprites.versions['generation-v']['black-white'].animated.front_default
        this.imageUrl = res.sprites.other['official-artwork'].front_default
        if (!this.imageUrlGif)
          this.imageUrlGif = this.imageUrl
      });
  };

  name(id: number): void {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .subscribe((res: any) => this.namePokemon = res.forms[0].name);
  };

  abilities(id: number): void {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .subscribe((res: any) => this.abilitiesGet = res.abilities);
  };

  stats(id: number): void {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .subscribe((res: any) => this.statsBase = res.stats);
  };

  type(id: number): void {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .subscribe((res: any) => this.types = res.types);
  }

  heights(id: number): void {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .subscribe((res: any) => this.height = res.height/10);
  }
  
  printValue() {
    const id = this.pokemons.filter((res, index) => {
      if (res.name === this.control.value) {
        this.actualId = index + 1;
        this.indexChange = true;
      }
      return;
    });
    console.log(id)
    if (this.indexChange === false) {
      confirm("No se encontró el pokemon");
    }
    this.indexChange = false;
    this.poke(this.actualId);
    this.abilities(this.actualId);
    this.name(this.actualId);
    this.stats(this.actualId);
    this.type(this.actualId);
    this.heights(this.actualId);
  };
}