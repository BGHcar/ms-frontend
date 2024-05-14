import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiario } from 'src/app/models/funeraria/beneficiario.model';
import { Cliente } from 'src/app/models/funeraria/cliente.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  constructor(private http:HttpClient) { }

  list():Observable<Beneficiario[]>{
    return this.http.get<Beneficiario[]>(`${environment.url_ms_funeraria}/beneficiarios`);
  }

  view(id:number):Observable<Beneficiario>{
    return this.http.get<Beneficiario>(`${environment.url_ms_funeraria}/beneficiarios/${id}`);
  }

  create(beneficiario:Beneficiario):Observable<Beneficiario>{
    return this.http.post<Beneficiario>(`${environment.url_ms_funeraria}/beneficiarios`, beneficiario);
  }
  
  createCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>("http://localhost:4200/#/clientes/create", cliente);
  }

  read(id:number):Observable<Beneficiario>{
    return this.http.get<Beneficiario>(`${environment.url_ms_funeraria}/beneficiarios/${id}`);
  }

  update(beneficiario:Beneficiario):Observable<Beneficiario>{
    return this.http.put<Beneficiario>(`${environment.url_ms_funeraria}/beneficiarios/${beneficiario.id}`, beneficiario);
  }

  delete(id:number):Observable<Beneficiario>{
    return this.http.delete<Beneficiario>(`${environment.url_ms_funeraria}/beneficiarios/${id}`);
  }

  

}
