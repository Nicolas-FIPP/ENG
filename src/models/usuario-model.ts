import { PrismaClient } from '@prisma/client';
import { UsuarioCreateBody } from 'dtos/usuario/usuario.dto';

const prisma = new PrismaClient();

export default class UsuarioModel {
  create = async (usuario: UsuarioCreateBody) => {
    return await prisma.usuario.create({
      data: {
        senha: usuario.senha,
        nivel_acesso: usuario.nivel_acesso,
        fisica: {
          connect: {
            pes_id: usuario.pes_id,
          },
        },
      },
    });
  };

  getByFisicaId = async (id: number) => {
    return await prisma.usuario.findUnique({
      where: {
        pes_id: id,
      },
    });
  };

  verificaSenha = async (senha: string, senhaBanco: string) => {
    const bcrypt = require('bcrypt');

    const verificacao: boolean = await bcrypt.compare(senha, senhaBanco);

    return verificacao;
  };

  getById = async (id: number) => {
    return await prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });
  };

  getAll = async () => {
    return await prisma.usuario.findMany();
  };

  deleteLogico = async (id: number) => {
    return await prisma.usuario.update({
      where: {
        id: id,
      },
      data: {
        status: false,
      },
    });
  };

  alterarSenha = async (id: number, novaSenha: string) => {
    return await prisma.usuario.update({
      where: {
        id: id,
      },
      data: {
        senha: novaSenha,
      },
    });
  };

  getAllAdmins = async (nivel: number) => {
    return await prisma.usuario.findMany({
      where: {
        nivel_acesso: nivel,
      },
    });
  };
}
