import { Beneficiario } from "./beneficiario.model"
import { Titular } from "./titular.model"

export class Cliente {
    id?: number
    nombre: string
    apellido: string
    cedula: string
    telefono: string
    email: string
    password?: string
    user_id?: string
    titular?: Titular
    beneficiarios?: Beneficiario[]
}
