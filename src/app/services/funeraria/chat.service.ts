import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/models/funeraria/chat.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  list():Observable<Chat[]>{
    return this.http.get<Chat[]>(`${environment.url_ms_funeraria}/chats`);
  }

  view(id:number):Observable<Chat>{
    return this.http.get<Chat>(`${environment.url_ms_funeraria}/chats/${id}`);
  }

  create(chat:Chat):Observable<Chat>{
    return this.http.post<Chat>(`${environment.url_ms_funeraria}/chats`, chat);
  }

  read(id:number):Observable<Chat>{
    return this.http.get<Chat>(`${environment.url_ms_funeraria}/chats/${id}`);
  }

  update(chat:Chat):Observable<Chat>{
    return this.http.put<Chat>(`${environment.url_ms_funeraria}/chats/${chat.id}`, chat);
  }

  delete(id:number):Observable<Chat>{
    return this.http.delete<Chat>(`${environment.url_ms_funeraria}/chats/${id}`);
  }

}
