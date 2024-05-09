import { Titular } from "./titular.model";

export class Beneficiario {
    id?:number;
    nombre:string;
    apellido:string;
    cedula:string;
    telefono:string;
    titular_id?:number;
    cliente_id?:number;
}
