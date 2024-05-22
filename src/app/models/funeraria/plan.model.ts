import { Servicio } from "./servicio.model";
import { Cliente } from "./cliente.model";

export class Plan {
    id?: number;
    nombre: string;
    precio: number;
    max_beneficiarios: number;
    duracion: number;
    descuento: number;
    precio_final: number;
    estado: boolean;
    servicios?: Servicio[];
    clientes?: Cliente[]
}
