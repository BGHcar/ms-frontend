import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from 'src/app/models/funeraria/pago.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${environment.url_ms_funeraria}/pagos`);
  }

  view(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${environment.url_ms_funeraria}/pagos/${id}`);
  }

  create(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${environment.url_ms_funeraria}/pagos`, pago);
  }

  read(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${environment.url_ms_funeraria}/pagos/${id}`);
  }

  update(pago: Pago): Observable<Pago> {
    return this.http.put<Pago>(`${environment.url_ms_funeraria}/pagos/${pago.id}`, pago);
  }

  delete(id: number): Observable<Pago> {
    return this.http.delete<Pago>(`${environment.url_ms_funeraria}/pagos/${id}`);
  }

  findBySubscription(id: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${environment.url_ms_funeraria}/pagossuscripcion/${id}`);
  }
}
