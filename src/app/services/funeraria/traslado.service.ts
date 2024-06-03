import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Traslado } from 'src/app/models/funeraria/traslado.model';


@Injectable({
  providedIn: 'root'
})
export class TrasladoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Traslado[]> {
    return this.http.get<Traslado[]>(`${environment.url_ms_funeraria}/traslados`);
  }

  view(id: number): Observable<Traslado> {
    return this.http.get<Traslado>(`${environment.url_ms_funeraria}/traslados/${id}`);
  }

  create(traslado: Traslado): Observable<Traslado> {
    return this.http.post<Traslado>(`${environment.url_ms_funeraria}/traslados`, traslado);
  }

  read(id: number): Observable<Traslado> {
    return this.http.get<Traslado>(`${environment.url_ms_funeraria}/traslado/${id}`);
  }

  update(traslado: Traslado): Observable<Traslado> {
    return this.http.put<Traslado>(`${environment.url_ms_funeraria}/traslados/${traslado.id}`, traslado);
  }

  delete(id: number): Observable<Traslado> {
    return this.http.delete<Traslado>(`${environment.url_ms_funeraria}/traslados/${id}`);
  }
}
