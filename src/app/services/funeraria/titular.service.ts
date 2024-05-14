import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titular } from 'src/app/models/funeraria/titular.model';
import { environment } from 'src/environments/environment';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { ManageComponent } from 'src/app/pages/clientes/manage/manage.component';

@Injectable({
  providedIn: 'root'
})
export class TitularService {

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<Titular[]> {
    return this.http.get<Titular[]>(`${environment.url_ms_funeraria}/titulares`);
  }

  view(id: number): Observable<Titular> {
    return this.http.get<Titular>(`${environment.url_ms_funeraria}/titulares/${id}`);
  }

  create(titular: Titular): Observable<Titular> {
    return this.http.post<Titular>(`${environment.url_ms_funeraria}/titulares`, titular);
  }

  read(id: number): Observable<Titular> {
    return this.http.get<Titular>(`${environment.url_ms_funeraria}/titulares/${id}`);
  }

  update(titular: Titular): Observable<Titular> {
    return this.http.put<Titular>(`${environment.url_ms_funeraria}/titulares/${titular.id}`, titular);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post <Cliente>("http://localhost:4200/#/clientes/create", cliente);
  }

  delete(id: number): Observable<Titular> {
    return this.http.delete<Titular>(`${environment.url_ms_funeraria}/titulares/${id}`);
  }
}
