import { Ciudad } from "./ciudad.model";

export class Departamento {
    id?:number;
    nombre:string;
    ciudades?:Ciudad[];
}
