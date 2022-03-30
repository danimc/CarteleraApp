import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private cartelaraPage = 1;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: '7eb596ee833e97fcc3e9380705ba5740',
      languaje: 'es-Es',
      page: this.cartelaraPage.toString(),
    };
  }

  getCartelera(): Observable<CarteleraResponse> {
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        tap(() => {
          this.cartelaraPage += 1;
        })
      );
  }
}
