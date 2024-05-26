import { Mensaje } from "./mensaje.model";

export class Chat {
    id?:number;
    eservicio_id:number;
    mensajes:Mensaje[];
}
