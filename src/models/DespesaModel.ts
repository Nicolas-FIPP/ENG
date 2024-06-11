import { PrismaClient } from "@prisma/client"
import { DespesaIn, DespesaUpdate } from "dtos/DespesaDTO";



const prisma = new PrismaClient();

export default class DespesaModel{
    create = async(despesa: DespesaIn) => {
        return await prisma.despesa.create({
            data:{
                nome: despesa.nome,
                valor: despesa.valor,
                dt_vencimento: despesa.dt_vencimento,
                dt_pagamento: despesa.dt_pagamento,
                tde_id: despesa.tde_id,
                usu_id: despesa.usu_id
            }
        });
    }

    update = async(despesa: DespesaUpdate) => {
        return await prisma.despesa.update({
            where:{
                id: despesa.id
            },
            data:{
                nome: despesa.nome,
                valor: despesa.valor,
                dt_vencimento: despesa.dt_vencimento,
                dt_pagamento: despesa.dt_pagamento,
                tde_id: despesa.tde_id,
                usu_id: despesa.usu_id
            }
        })
    }
    
}
 