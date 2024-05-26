import { Cliente } from "./cliente.model";
import { Servicio } from "./servicio.model";

export class Ejecucionservicio {
    id?:number;
    token:string;
    ubicacion:string;
    difunto_id:number;
    servicio_id:number;
    cliente_id:number
    cliente?:Cliente;
    servicio?:Servicio;
}
