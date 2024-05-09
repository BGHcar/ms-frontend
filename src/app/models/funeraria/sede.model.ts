import { Sala } from "./sala.model";

export class Sede {
    id?:number;
    nombre:string;
    direccion:string;
    telefono:string;
    correo_electronico:string;
    ciudad_id?:number;
    salas?:Sala[];
}
