import { Suscripcion } from "./suscripcion.model";

export class Pago {
    id?: number;
    monto: number;
    fecha: string;
    suscripcion?: Suscripcion;
}
