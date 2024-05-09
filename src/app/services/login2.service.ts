import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login2 } from '../models/login2.model';
import { environment } from 'src/environments/environment';

interface SecondFactorRequest {
  id: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class Login2Service {

  constructor(private http:HttpClient) { }

  login(login : Login2): Observable<Login2>{
    return this.http.post<Login2>(`${environment.url_ms_security}/public/security/login`, login);
  }

  secondAut(data : SecondFactorRequest): Observable<string>{
    return this.http.put<string>(`${environment.url_ms_security}/public/security/secondauth`, data);
  }
}
