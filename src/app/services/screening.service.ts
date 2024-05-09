import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Screening } from '../models/screening.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor(private http: HttpClient) { }

  list(): Observable<Screening[]>{
    return this.http.get<Screening[]>(`${environment.url_ms_cinema}/screenings`);
  }

  view(id: number): Observable<Screening>{
    return this.http.get<Screening>(`${environment.url_ms_cinema}/screenings/${id}`);
  }
  

  create(screening: Screening): Observable<Screening>{
    return this.http.post<Screening>(`${environment.url_ms_cinema}/screenings`, screening);
  }

  read(id: number): Observable<Screening>{
    return this.http.get<Screening>(`${environment.url_ms_cinema}/screenings/${id}`);
  }

  update(screening: Screening): Observable<Screening>{
    return this.http.put<Screening>(`${environment.url_ms_cinema}/screenings/${screening.id}`, screening);
  }

  delete(id: number): Observable<Screening>{
    return this.http.delete<Screening>(`${environment.url_ms_cinema}/screenings/${id}`);
  }
}
