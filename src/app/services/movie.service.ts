import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  list(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${environment.url_ms_cinema}/movies`);
  }

  view(id: number): Observable<Movie>{
    return this.http.get<Movie>(`${environment.url_ms_cinema}/movies/${id}`);
  }

  create(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(`${environment.url_ms_cinema}/movies`, movie);
  }

  read(id: number): Observable<Movie>{
    return this.http.get<Movie>(`${environment.url_ms_cinema}/movies/${id}`);
  }

  update(movie: Movie): Observable<Movie>{
    return this.http.put<Movie>(`${environment.url_ms_cinema}/movies/${movie.id}`, movie);
  }

  delete(id: number): Observable<Movie>{
    return this.http.delete<Movie>(`${environment.url_ms_cinema}/movies/${id}`);
  }

}
