export interface DespesaIn{
    nome: string,
    valor: number,
    dt_vencimento: Date,
    dt_pagamento: Date,
    tde_id: number,
    usu_id: number
}


export interface DespesaUpdate{
    id: number,
    nome: string,
    valor: number,
    dt_vencimento: Date,
    dt_pagamento: Date,
    tde_id: number,
    usu_id: number
}