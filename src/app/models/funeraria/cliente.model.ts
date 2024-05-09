import { Beneficiario } from "./beneficiario.model"
import { Titular } from "./titular.model"

export class Cliente {
    id?:number
    nombre:string
    apellido:string
    cedula:string
    telefono:string
    email:string
    usuario_id?:number
    titular?:Titular
    beneficiarios?:Beneficiario[]
}
