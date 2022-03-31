import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private cartelaraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: '7eb596ee833e97fcc3e9380705ba5740',
      languaje: 'es-Es',
      page: this.cartelaraPage.toString(),
    };
  }

  resetCartelera() {
    this.cartelaraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {
    console.log('cargando API');

    if (this.cargando) {
      //of emite un observable
      return of([]);
    }

    this.cargando = true;

    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.cartelaraPage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: texto };

    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
        params,
      })
      .pipe(map((resp) => resp.results));
  }
}
