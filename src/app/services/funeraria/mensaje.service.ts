import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensaje } from 'src/app/models/funeraria/mensaje.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private http: HttpClient) { }

  list(): Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(`${environment.url_ms_funeraria}/mensajes`);
  }

  view(id: number): Observable<Mensaje>{
    return this.http.get<Mensaje>(`${environment.url_ms_funeraria}/mensajes/${id}`);
  }

  create(newMensaje: Mensaje): Observable<Mensaje>{
    return this.http.post<Mensaje>(`${environment.url_ms_funeraria}/mensajes`, newMensaje);
  }

  read(id: number): Observable<Mensaje>{
    return this.http.get<Mensaje>(`${environment.url_ms_funeraria}/mensajes-chat/${id}`);
  }

  update(mensaje: Mensaje): Observable<Mensaje>{
    return this.http.put<Mensaje>(`${environment.url_ms_funeraria}/mensajes/${mensaje.id}`, mensaje);
  }

  delete(id: number): Observable<Mensaje>{
    return this.http.delete<Mensaje>(`${environment.url_ms_funeraria}/mensajes/${id}`);
  }

  
}
