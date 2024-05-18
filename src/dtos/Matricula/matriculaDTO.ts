import { OficinaOut } from "dtos/Oficina/OficinaDTO"

export interface matriculaIn{
    criado_em: Date
    pes_id:number
    ofi_id?:number
}


export interface matriculaOUT{
    criado_em: Date
    oficina: OficinaOut
    fisica: number
}