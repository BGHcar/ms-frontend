import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from 'src/app/models/funeraria/administrador.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http:HttpClient) { }

  list(): Observable<Administrador[]>{
    return this.http.get<Administrador[]>(`${environment.url_ms_funeraria}/administradores`);
  }

  view(id:number): Observable<Administrador>{
    return this.http.get<Administrador>(`${environment.url_ms_funeraria}/administradores/${id}`);
  }

  create(newAdministrador:Administrador): Observable<Administrador>{
    return this.http.post<Administrador>(`${environment.url_ms_funeraria}/administradores`, newAdministrador);
  }

  update(administrador:Administrador): Observable<Administrador>{
    return this.http.put<Administrador>(`${environment.url_ms_funeraria}/administradores/${administrador.id}`, administrador);
  }

  delete(id:number): Observable<Administrador>{
    return this.http.delete<Administrador>(`${environment.url_ms_funeraria}/administradores/${id}`);
  }

  security(name:string, email:string, password:string): Observable<Administrador>{
    return this.http.post<Administrador>(`${environment.url_ms_security}/users/public`, {name, email, password});
  }

  deleteUser(id:string): Observable<Administrador>{
    return this.http.delete<Administrador>(`${environment.url_ms_security}/users/${id}`);
  }

  

}
