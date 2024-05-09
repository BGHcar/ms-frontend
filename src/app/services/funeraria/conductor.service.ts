import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductor } from 'src/app/models/funeraria/conductor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(private http:HttpClient) { }

  list():Observable<Conductor[]>{
    return this.http.get<Conductor[]>(`${environment.url_ms_funeraria}/conductores`);
  }

  view(id:number):Observable<Conductor>{
    return this.http.get<Conductor>(`${environment.url_ms_funeraria}/conductores/${id}`);
  }

  create(conductor:Conductor):Observable<Conductor>{
    return this.http.post<Conductor>(`${environment.url_ms_funeraria}/conductores`, conductor);
  }

  read(id:number):Observable<Conductor>{
    return this.http.get<Conductor>(`${environment.url_ms_funeraria}/conductores/${id}`);
  }

  update(conductor:Conductor):Observable<Conductor>{
    return this.http.put<Conductor>(`${environment.url_ms_funeraria}/conductores/${conductor.id}`, conductor);
  }

  delete(id:number):Observable<Conductor>{
    return this.http.delete<Conductor>(`${environment.url_ms_funeraria}/conductores/${id}`);
  }
}
