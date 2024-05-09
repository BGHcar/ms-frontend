import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/models/funeraria/comentario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http:HttpClient) { }

  list():Observable<Comentario[]>{
    return this.http.get<Comentario[]>(`${environment.url_ms_funeraria}/comentarios`);
  }

  view(id:number):Observable<Comentario>{
    return this.http.get<Comentario>(`${environment.url_ms_funeraria}/comentarios/${id}`);
  }

  create(comentario:Comentario):Observable<Comentario>{
    return this.http.post<Comentario>(`${environment.url_ms_funeraria}/comentarios`, comentario);
  }

  read(id:number):Observable<Comentario>{
    return this.http.get<Comentario>(`${environment.url_ms_funeraria}/comentarios/${id}`);
  }

  update(comentario:Comentario):Observable<Comentario>{
    return this.http.put<Comentario>(`${environment.url_ms_funeraria}/comentarios/${comentario.id}`, comentario);
  }

  delete(id:number):Observable<Comentario>{
    return this.http.delete<Comentario>(`${environment.url_ms_funeraria}/comentarios/${id}`);
  }

  
}
