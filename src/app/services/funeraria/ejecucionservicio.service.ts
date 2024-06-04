import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EjecucionservicioService {

  constructor(private http: HttpClient) { }

  

  list(): Observable<Ejecucionservicio[]>{
    return this.http.get<Ejecucionservicio[]>(`${environment.url_ms_funeraria}/ejecucionservicios`);
  }

  view(id: number): Observable<Ejecucionservicio>{
    return this.http.get<Ejecucionservicio>(`${environment.url_ms_funeraria}/ejecucionservicios/${id}`);
  }

  create(newEjecucionservicio: Ejecucionservicio): Observable<Ejecucionservicio>{
    return this.http.post<Ejecucionservicio>(`${environment.url_ms_funeraria}/ejecucionservicios`, newEjecucionservicio);
  }

  read(id: number): Observable<Ejecucionservicio>{
    return this.http.get<Ejecucionservicio>(`${environment.url_ms_funeraria}/ejecucionservicios/${id}`);
  }

  update(ejecucionservicio: Ejecucionservicio): Observable<Ejecucionservicio>{
    return this.http.put<Ejecucionservicio>(`${environment.url_ms_funeraria}/ejecucionservicios/${ejecucionservicio.id}`, ejecucionservicio);
  }

  delete(id: number): Observable<Ejecucionservicio>{
    return this.http.delete<Ejecucionservicio>(`${environment.url_ms_funeraria}/ejecucionservicios/${id}`);
  }

  
}
