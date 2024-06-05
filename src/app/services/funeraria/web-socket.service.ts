import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {
  callback: EventEmitter<any> = new EventEmitter();
  nameEvent: string;
  constructor() {
    super({ url: environment.url_ms_funeraria })
    this.nameEvent = ""
  }
  setNameEvent(nameEvent: string) {
    this.nameEvent = nameEvent
    this.listen()
  }
  listen = () => {
    this.ioSocket.on(this.nameEvent, (res: any) => this.callback.emit(res))
  }
}
