import { OficinaOut } from "dtos/OficinaDTO"

export interface MatriculaIn{
    criado_em: Date
    pes_id:number
    ofi_id?:number
}


export interface MatriculaOUT{
    criado_em: Date
    oficina: OficinaOut
    fisica: number
}