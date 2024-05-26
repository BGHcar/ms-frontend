import { Sede } from "./sede.model";

export class Ciudad {
    id?:number;
    nombre:string;
    departamento_id?:number;
    sedes?:Sede[]
}
