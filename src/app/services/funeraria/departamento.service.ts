import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/funeraria/departamento.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Departamento[]>{
    return this.http.get<Departamento[]>(`${environment.url_ms_funeraria}/departamentos`);
  }

  view(id: number): Observable<Departamento>{
    return this.http.get<Departamento>(`${environment.url_ms_funeraria}/departamentos/${id}`);
  }

  create(newDepartamento: Departamento): Observable<Departamento>{
    return this.http.post<Departamento>(`${environment.url_ms_funeraria}/departamentos`, newDepartamento);
  }

  read(id: number): Observable<Departamento>{
    return this.http.get<Departamento>(`${environment.url_ms_funeraria}/departamentos/${id}`);
  }

  update(departamento: Departamento): Observable<Departamento>{
    return this.http.put<Departamento>(`${environment.url_ms_funeraria}/departamentos/${departamento.id}`, departamento);
  }

  delete(id: number): Observable<Departamento>{
    return this.http.delete<Departamento>(`${environment.url_ms_funeraria}/departamentos/${id}`);
  }

  
}
