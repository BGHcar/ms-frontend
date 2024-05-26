import { Cliente } from "./cliente.model";
import { Plan } from "./plan.model";

export class Suscripcion {
    id?: number;
    plan_id: number;
    cliente_id: number;
    plan?: Plan;
    cliente?: Cliente;

}
