import { PrismaClient } from "@prisma/client"
import { TipoDespesaIn } from "dtos/TipoDespesaDTO";

import { MatriculaDTO } from "dtos/Oficina/matriculaDTO";


const prisma = new PrismaClient();

export default class MatriculaModel{

    create = async (matricula : MatriculaDTO) => {

        
        return await prisma.matricula.create({
            data: {
                pes_id:matricula.pes_id,
                ofi_id:matricula.ofi_id,
                criado_em:matricula.criado_em
            }
        });
    };

    getAll = async() => {
        return await prisma.matricula.findMany();
    }


    jaCadastrou = async (id_usuario: number, id_oficina: number) => {
        return await prisma.matricula.findFirst({
            where: {
                AND: [
                    { pes_id: id_usuario },
                    { ofi_id: id_oficina }
                ]
            }
        });
    }

 
    
    
}