import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  list():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${environment.url_ms_funeraria}/clientes`);
  }

  view(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${environment.url_ms_funeraria}/clientes/${id}`);
  }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${environment.url_ms_funeraria}/clientes`, cliente);
  }

  read(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${environment.url_ms_funeraria}/clientes/${id}`);
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${environment.url_ms_funeraria}/clientes/${cliente.id}`, cliente);
  }

  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${environment.url_ms_funeraria}/clientes/${id}`);
  }

  security(name:string, email:string, password:string):Observable<Cliente>{
    return this.http.post<Cliente>(`${environment.url_ms_security}/users/public`, {name, email, password});
  }

  createTitular(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${environment.url_ms_funeraria}/titulares`, cliente);
  }

  createBeneficiario(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${environment.url_ms_funeraria}/beneficiarios`, cliente);
  }
}
