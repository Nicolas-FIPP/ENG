import { PrismaClient } from "@prisma/client"
import { UsuarioIn } from "dtos/UsuarioDTO";


const prisma = new PrismaClient();

export default class UsuarioModel{
    create = async (usuario: UsuarioIn) => {
        return await prisma.usuario.create({
            data:{
                senha: usuario.senha,
                nivel_acesso: usuario.nivel_acesso,
                fisica:{
                    connect: {
                        pes_id: usuario.pes_id
                    }
                }
            }
        });
    };

    getByFisicaId = async (id: number) => {
        return await prisma.usuario.findUnique({
            where:{
                pes_id: id
            }
        })
    };


    verificaSenha = async (senha: string, senhaBanco: string) => {
        const bcrypt = require('bcrypt');

        const verificacao : boolean = await bcrypt.compare(senha, senhaBanco);

        return verificacao;
    }

}