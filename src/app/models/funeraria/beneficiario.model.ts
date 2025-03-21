import { Titular } from "./titular.model";

export class Beneficiario {
    id?: number;
    nombre: string;
    apellido: string;
    cedula: string;
    telefono: string;
    edad: number;
    email: string;
    esta_vivo: boolean;
    password?: string;
    titular?: Titular;
    cliente_id?: number;
}
