import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from 'src/app/models/funeraria/sala.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${environment.url_ms_funeraria}/salas`);
  }

  view(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${environment.url_ms_funeraria}/salas/${id}`);
  }

  create(sala: Sala): Observable<Sala> {
    return this.http.post<Sala>(`${environment.url_ms_funeraria}/salas`, sala);
  }

  read(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${environment.url_ms_funeraria}/salas/${id}`);
  }

  update(sala: Sala): Observable<Sala> {
    return this.http.put<Sala>(`${environment.url_ms_funeraria}/salas/${sala.id}`, sala);
  }

  delete(id: number): Observable<Sala> {
    return this.http.delete<Sala>(`${environment.url_ms_funeraria}/salas/${id}`);
  }
}
