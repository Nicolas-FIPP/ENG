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

    delete = async(id: number) => {
        return await prisma.tipo_despesa.delete({
            where:{
                id: id
            }
        })
    }

    update = async(id: number, nome: string) => {
        return await prisma.tipo_despesa.update({
            where:{
                id: id
            },
            data:{
                nome: nome
            }
        })
    }
}