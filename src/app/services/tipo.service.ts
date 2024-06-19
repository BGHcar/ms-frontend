import { Injectable } from '@angular/core';
import { Tipo } from '../models/tipo.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private http:HttpClient) { }

  list(): Observable<Tipo[]>{
    return this.http.get<Tipo[]>(`${environment.url_ms_musica}/tipos-musica`);
  }
}
