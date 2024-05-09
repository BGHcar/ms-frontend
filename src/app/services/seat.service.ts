import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Seat } from '../models/seat.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http: HttpClient) { }

  list(): Observable<Seat[]>{
    return this.http.get<Seat[]>(`${environment.url_ms_cinema}/seats`);
  }

  view(id: number): Observable<Seat>{
    return this.http.get<Seat>(`${environment.url_ms_cinema}/seats/${id}`);
  }
  

  create(seat: Seat): Observable<Seat>{
    return this.http.post<Seat>(`${environment.url_ms_cinema}/seats`, seat);
  }

  read(id: number): Observable<Seat>{
    return this.http.get<Seat>(`${environment.url_ms_cinema}/seats/${id}`);
  }

  update(seat: Seat): Observable<Seat>{
    return this.http.put<Seat>(`${environment.url_ms_cinema}/seats/${seat.id}`, seat);
  }

  delete(id: number): Observable<Seat>{
    return this.http.delete<Seat>(`${environment.url_ms_cinema}/seats/${id}`);
  }
}
