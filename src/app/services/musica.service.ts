import { Injectable } from '@angular/core';
import { Musica } from '../models/musica.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Musica[]>{
    return this.http.get<Musica[]>(`${environment.url_ms_musica}/servicios-muisicales`);
  }

  create(newMusica: Musica): Observable<Musica>{
    return this.http.post<Musica>(`${environment.url_ms_musica}/servicios-muisicales`, newMusica);
  }
}
