import { Beneficiario } from "./beneficiario.model";

export class Titular {
    id?:number;
    nombre:string;
    apellido:string;
    cedula:string;
    telefono:string;
    edad:number;
    email:string;
    esta_vivo:boolean;
    password?:string;
    cliente_id?:number;
    beneficiarios?:Beneficiario[];
}
