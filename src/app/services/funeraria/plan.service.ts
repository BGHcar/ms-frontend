import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/models/funeraria/plan.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  list(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${environment.url_ms_funeraria}/planes`);
  }

  view(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${environment.url_ms_funeraria}/planes/${id}`);
  }

  create(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${environment.url_ms_funeraria}/planes`, plan);
  }

  read(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${environment.url_ms_funeraria}/planes/${id}`);
  }

  update(plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${environment.url_ms_funeraria}/planes/${plan.id}`, plan);
  }

  delete(id: number): Observable<Plan> {
    return this.http.delete<Plan>(`${environment.url_ms_funeraria}/planes/${id}`);
  }
}
