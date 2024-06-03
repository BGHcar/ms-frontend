import { Cremacion } from "./cremacion.model";
import { Sepultura } from "./sepultura.model";
import { Traslado } from "./traslado.model";

export class Servicio {
    id?:number;
    nombre:string;
    precio:number;
    descripcion:string;
    duracion:number;
    traslados?:Traslado;
    sepultura?:Sepultura;
    cremacion?:Cremacion;

}
