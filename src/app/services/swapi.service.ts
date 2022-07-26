import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { concatAll, map, mergeMap } from 'rxjs/operators';
import { Characters, Planets, Starships } from '../interfaces';
import { AllFilms, Films } from './films-info';

const poster: Record<string, string> = {
  5: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/ed5c516a-5731-4e92-89f5-dbe21b3e84fe/600x900',
  4: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9bdc6690-de82-4a8c-a114-aa3a353bc1da/600x900',
  6: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/f5ebf6f5-0023-4f91-b4ef-7b1a19336102/600x900',
  1: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/e5e5bc9a-7caa-4db6-96b0-45811d4474a1/600x900',
  2: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4f17a0f6-5440-48ad-8764-60e723be0d59/600x900',
  3: 'https://avatars.mds.yandex.net/get-kinopoisk-image/4486454/2720c811-4065-43cf-9fc5-bd18ee3dbbf0/600x900',
};

const wrapper: Record<string, string> = {
  5: 'https://avatars.mds.yandex.net/get-ott/1534341/2a0000016fb26a17f68021587d8d0311cc09/678x380',
  4: 'https://avatars.mds.yandex.net/get-ott/2419418/2a0000016fb264111a4fa5ab487b46990394/678x380',
  6: 'https://avatars.mds.yandex.net/get-ott/2439731/2a0000016fb270899613ca817d7c5fc08750/678x380',
  1: 'https://avatars.mds.yandex.net/get-ott/1652588/2a0000016fb27b97beee97f93c92540dd577/678x380',
  2: 'https://cdn.smartfacts.ru/180015/zvezdnye-voyny-epizod-2-ataka-klonov_0.jpg',
  3: 'https://avatars.mds.yandex.net/get-ott/1652588/2a0000016fb2769074a29aa7cfb346e9e28d/678x380',
};



@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  path = 'https://swapi.dev/api/films'

  constructor(private http: HttpClient) {}

  getAllFilms(): Observable<Films[]> {
    return this.http.get<AllFilms>(this.path).pipe(
      map((d) => d.results),
      map((films) =>
        films.map((f) => {
          f.poster = poster[f.episode_id];
          f.release_date = new Date(f.release_date);
          return f;
        })
      )
    );
  }

  getFilmById(id: number): Observable<Films> {
    return this.http.get<Films>(this.path + '/' + id).pipe(
      map((f) => {
        f.poster = wrapper[f.episode_id];
        f.release_date = new Date(f.release_date);
        return f;
      })
    );
  }

  getSubs(arr: string[]) {
   /*  from(arr).pipe(map(url => this.http.get(url)), concatAll()).subscribe(e => console.log(e)) */

    let Observable = arr.map(url => this.http.get<Characters | Planets | Starships>(url))
    return forkJoin(Observable)

  }

}
