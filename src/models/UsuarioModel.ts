import { PrismaClient } from "@prisma/client"
import { UsuarioIn } from "dtos/UsuarioDTO";


const prisma = new PrismaClient();

export default class UsuarioModel{
    create = async (usuario: UsuarioIn) => {
        return await prisma.usuario.create({
            data:{
                senha: usuario.senha,
                nivel_acesso: usuario.nivel_acesso,
                status: usuario.status,
                fisica:{
                    connect: {
                        pes_id: usuario.pes_id
                    }
                }
            }
        });
    };

    getById = async (id: number) => {
        return await prisma.usuario.findUnique({
            where:{
                id
            }
        })
    };

    getByCpf = async (cpf: string) => {
        return await prisma.fisica.findUnique({
          where: {
            cpf: cpf,
          },
          include: {
            usuario: true,
          },
        });
    };

}