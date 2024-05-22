import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Suscripcion } from 'src/app/models/funeraria/suscripcion.model';


@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {

  constructor(private http: HttpClient) { }

  list(): Observable<Suscripcion[]> {
    return this.http.get<Suscripcion[]>(`${environment.url_ms_funeraria}/suscripciones`);
  }

  view(id: number): Observable<Suscripcion> {
    return this.http.get<Suscripcion>(`${environment.url_ms_funeraria}/suscripciones/${id}`);
  }

  create(Suscripcion: Suscripcion): Observable<Suscripcion> {
    return this.http.post<Suscripcion>(`${environment.url_ms_funeraria}/suscripciones`, Suscripcion);
  }

  read(id: number): Observable<Suscripcion> {
    return this.http.get<Suscripcion>(`${environment.url_ms_funeraria}/suscripciones/${id}`);
  }

  update(Suscripcion: Suscripcion): Observable<Suscripcion> {
    return this.http.put<Suscripcion>(`${environment.url_ms_funeraria}/suscripciones/${Suscripcion.id}`, Suscripcion);
  }

  delete(id: number): Observable<Suscripcion> {
    return this.http.delete<Suscripcion>(`${environment.url_ms_funeraria}/suscripciones/${id}`);
  }
}
