import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projector } from '../models/projector.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectorService {

  constructor(private http: HttpClient) { }

  list(): Observable<Projector[]>{
    return this.http.get<Projector[]>(`${environment.url_ms_cinema}/projectors`);
  }

  view(id: number): Observable<Projector>{
    return this.http.get<Projector>(`${environment.url_ms_cinema}/projectors/${id}`);
  }
  

  create(projector: Projector): Observable<Projector>{
    return this.http.post<Projector>(`${environment.url_ms_cinema}/projectors`, projector);
  }

  read(id: number): Observable<Projector>{
    return this.http.get<Projector>(`${environment.url_ms_cinema}/projectors/${id}`);
  }

  update(projector: Projector): Observable<Projector>{
    return this.http.put<Projector>(`${environment.url_ms_cinema}/projectors/${projector.id}`, projector);
  }

  delete(id: number): Observable<Projector>{
    return this.http.delete<Projector>(`${environment.url_ms_cinema}/projectors/${id}`);
  }
}
