import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sepultura } from 'src/app/models/funeraria/sepultura.model';

@Injectable({
  providedIn: 'root'
})
export class SepulturaService {

  constructor(private http: HttpClient) { }
  list(): Observable<Sepultura[]> {
    return this.http.get<Sepultura[]>(`${environment.url_ms_funeraria}/sepulturas`);
  }
  view(id: number): Observable<Sepultura> {
    return this.http.get<Sepultura>(`${environment.url_ms_funeraria}/sepulturas/${id}`);
  }
  create(theSepultura: Sepultura): Observable<Sepultura> {
    return this.http.post<Sepultura>(`${environment.url_ms_funeraria}/sepulturas`, theSepultura);
  }
  delete(id: number): Observable<Sepultura> {
    return this.http.delete<Sepultura>(`${environment.url_ms_funeraria}/sepulturas/${id}`);
  }
  update(theSepultura: Sepultura): Observable<Sepultura> {
    return this.http.put<Sepultura>(`${environment.url_ms_funeraria}/sepulturas/${theSepultura.id}`, theSepultura);
  }
  listbyServicio(id:number):Observable<Sepultura[]>{
    return this.http.get<Sepultura[]>(`${environment.url_ms_funeraria}/servicioSepultura/${id}`);
  }


}
