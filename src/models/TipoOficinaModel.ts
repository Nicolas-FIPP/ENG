import { PrismaClient } from '@prisma/client';
import { TipoOficinaIn } from 'dtos/TipoOficinaDTO';

const prisma = new PrismaClient();

export default class TipoOficinaModel {

  create = async (tipooficina : TipoOficinaIn) => {
    return await prisma.tipo_oficina.create({
      data : {
        nome : tipooficina.nome
      }
    });
  }

  getAll = async () => {
    return await prisma.tipo_oficina.findMany();
  }

  get = async (id: number) => {
    return await prisma.tipo_oficina.findUnique({
      where: {
        id
      }
    });
  }

  delete = async (id: number) => {
    return await prisma.tipo_oficina.delete({
      where: {
        id
      }
    })
  }

  update = async (id: number, tipooficina: TipoOficinaIn) => {
    return await prisma.tipo_oficina.update({
      where: {
        id
      },
      data: {
        ...tipooficina
      }
    })
  }
};