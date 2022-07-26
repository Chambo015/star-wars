import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Characters, isCharacters, isPlanets, isStarships, Planets, Starships } from '../interfaces';
import { Films } from '../services/films-info';
import { SwapiService } from '../services/swapi.service';




@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss'],
})
export class FilmPageComponent implements OnInit {
  film: Films | undefined;

  characters: Characters[] = [];
  planets: Planets[] = [];
  starships: Starships[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private swapiService: SwapiService
  ) {}

  getFilmDetail(arrUrl: string[]) {
    return this.swapiService.getSubs(arrUrl).subscribe((arr) => {
      return arr;
    });
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.swapiService.getFilmById(+params['id']).subscribe((res) => {
        this.film = res;
        if (this.film) {
          this.swapiService.getSubs(this.film.characters).subscribe((arr) => {
            if (isCharacters(arr)) this.characters = arr;
          });
          this.swapiService.getSubs(this.film.starships).subscribe((arr) => {
            if (isStarships(arr)) this.starships = arr;
          });
          this.swapiService.getSubs(this.film.planets).subscribe((arr) => {
            if (isPlanets(arr)) this.planets = arr;
          });
        }
      });
    });
  }
}
