import { Beneficiario } from "./beneficiario.model";

export class Titular {
    id?:number;
    nombre:string;
    apellido:string;
    cedula:string;
    telefono:string;
    edad:number;
    email:string;
    password?:string;
    user_id?:number;
    beneficiarios?:Beneficiario[];
}
