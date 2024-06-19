import { Cremacion } from "./cremacion.model";
import { Sepultura } from "./sepultura.model";
import { Traslado } from "./traslado.model";

export class Servicio {
    id?:number;
    nombre?:string;
    descripcion?:string;
    duracion?:number;
    traslado?:Traslado;
    sepultura?:Sepultura;
    cremacion?:Cremacion;
}
