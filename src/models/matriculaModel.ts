import { PrismaClient } from "@prisma/client"
import { TipoDespesaIn } from "dtos/TipoDespesaDTO";

import { MatriculaDTO } from "dtos/Oficina/matriculaDTO";


const prisma = new PrismaClient();

export default class MatriculaModel{

    create = async (matricula : MatriculaDTO) => {
        return await prisma.matricula.create({
            data: matricula
        });
    };

    getAll = async() => {
        return await prisma.matricula.findMany();
    }
}