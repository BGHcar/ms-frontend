import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cremacion } from 'src/app/models/funeraria/cremacion.model';

@Injectable({
  providedIn: 'root'
})
export class CremacionService {

  constructor(private http: HttpClient) { }
  list(): Observable<Cremacion[]> {
    return this.http.get<Cremacion[]>(`${environment.url_ms_funeraria}/cremaciones`);
  }
  view(id: number): Observable<Cremacion> {
    return this.http.get<Cremacion>(`${environment.url_ms_funeraria}/cremaciones/${id}`);
  }
  create(theCremacion: Cremacion): Observable<Cremacion> {
    return this.http.post<Cremacion>(`${environment.url_ms_funeraria}/cremaciones`, theCremacion);
  }
  delete(id: number): Observable<Cremacion> {
    return this.http.delete<Cremacion>(`${environment.url_ms_funeraria}/cremaciones/${id}`);
  }
  update(theCremacion: Cremacion): Observable<Cremacion> {
    return this.http.put<Cremacion>(`${environment.url_ms_funeraria}/cremaciones/${theCremacion.id}`, Cremacion);
  }
  

}
