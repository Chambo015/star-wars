import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Films } from '../services/films-info';
import { SwapiService } from '../services/swapi.service';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  films: Films[] = []

  constructor(private swapiService: SwapiService, private router: Router) { }

  ngOnInit(): void {

    this.swapiService.getAllFilms().subscribe(arr => this.films = arr)
  }

  goToFilmPage(url: string) {
    this.router.navigate(['/films', url.slice(-2, -1)])
  }
}
