import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from 'src/app/models/funeraria/sede.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http: HttpClient) { }

  list(): Observable<Sede[]>{
    return this.http.get<Sede[]>(`${environment.url_ms_funeraria}/sedes`);
  }

  view(id: number): Observable<Sede>{
    return this.http.get<Sede>(`${environment.url_ms_funeraria}/sedes/${id}`);
  }

  create(newSede: Sede): Observable<Sede>{
    return this.http.post<Sede>(`${environment.url_ms_funeraria}/sedes`, newSede);
  }

  read(id: number): Observable<Sede>{
    return this.http.get<Sede>(`${environment.url_ms_funeraria}/sedes/${id}`);
  }

  update(sede: Sede): Observable<Sede>{
    return this.http.put<Sede>(`${environment.url_ms_funeraria}/sedes/${sede.id}`, sede);
  }

  delete(id: number): Observable<Sede>{
    return this.http.delete<Sede>(`${environment.url_ms_funeraria}/sedes/${id}`);
  }

  
}
