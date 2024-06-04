import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planxservicio } from 'src/app/models/funeraria/planxservicio.model';


@Injectable({
  providedIn: 'root'
})
export class PlanxservicioService {

  constructor(private http: HttpClient) { }

  list(): Observable<Planxservicio[]> {
    return this.http.get<Planxservicio[]>(`${environment.url_ms_funeraria}/serviciosxplanes`);
  }

  view(id: number): Observable<Planxservicio> {
    return this.http.get<Planxservicio>(`${environment.url_ms_funeraria}/serviciosxplanes/${id}`);
  }

  create(Planxservicio: Planxservicio): Observable<Planxservicio> {
    return this.http.post<Planxservicio>(`${environment.url_ms_funeraria}/serviciosxplanes`, Planxservicio);
  }

  read(id: number): Observable<Planxservicio> {
    return this.http.get<Planxservicio>(`${environment.url_ms_funeraria}/serviciosxplanes/${id}`);
  }

  update(Planxservicio: Planxservicio): Observable<Planxservicio> {
    return this.http.put<Planxservicio>(`${environment.url_ms_funeraria}/serviciosxplanes/${Planxservicio.id}`, Planxservicio);
  }

  delete(id: number): Observable<Planxservicio> {
    return this.http.delete<Planxservicio>(`${environment.url_ms_funeraria}/serviciosxplanes/${id}`);
  }
}
