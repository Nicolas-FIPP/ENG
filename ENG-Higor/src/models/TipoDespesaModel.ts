import { PrismaClient } from "@prisma/client"
import { TipoDespesaIn } from "dtos/TipoDespesaDTO";



const prisma = new PrismaClient();

export default class TipoDespesaModel{

    create = async (tipoDespesa : TipoDespesaIn) => {
        return await prisma.tipo_despesa.create({
            data:{
                nome: tipoDespesa.nome,
            }
        });
    };

    getAll = async() => {
        return await prisma.tipo_despesa.findMany();
    }
}