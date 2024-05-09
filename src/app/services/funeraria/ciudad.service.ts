import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from 'src/app/models/funeraria/ciudad.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http:HttpClient) { }

  list():Observable<Ciudad[]>{
    return this.http.get<Ciudad[]>(`${environment.url_ms_funeraria}/ciudades`);
  }

  view(id:number):Observable<Ciudad>{
    return this.http.get<Ciudad>(`${environment.url_ms_funeraria}/ciudades/${id}`);
  }

  create(ciudad:Ciudad):Observable<Ciudad>{
    return this.http.post<Ciudad>(`${environment.url_ms_funeraria}/ciudades`, ciudad);
  }

  read(id:number):Observable<Ciudad>{
    return this.http.get<Ciudad>(`${environment.url_ms_funeraria}/ciudades/${id}`);
  }

  update(ciudad:Ciudad):Observable<Ciudad>{
    return this.http.put<Ciudad>(`${environment.url_ms_funeraria}/ciudades/${ciudad.id}`, ciudad);
  }

  delete(id:number):Observable<Ciudad>{
    return this.http.delete<Ciudad>(`${environment.url_ms_funeraria}/ciudades/${id}`);
  }

  
}
