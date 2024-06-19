import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from 'src/app/models/funeraria/servicio.model';
import { Ejecucionservicio } from 'src/app/models/funeraria/ejecucionservicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }
  list(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${environment.url_ms_funeraria}/servicios`);
  }
  view(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${environment.url_ms_funeraria}/servicios/${id}`);
  }
  create(theServices: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(`${environment.url_ms_funeraria}/servicios`, theServices);
  }
  delete(id: number): Observable<Servicio> {
    return this.http.delete<Servicio>(`${environment.url_ms_funeraria}/servicios/${id}`);
  }
  update(theServicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${environment.url_ms_funeraria}/servicios/${theServicio.id}`, theServicio);
  }
  
  listByTitular(id:number):Observable<Ejecucionservicio[]>{
    return this.http.get<Ejecucionservicio[]>(`${environment.url_ms_funeraria}/serviciotitular/${id}`);
  }
  checkSubscription(titularId: number): Observable<any> {
    return this.http.get(`${environment.url_ms_funeraria}/titular/${titularId}/subscription`);
  }

}
