import { PrismaClient } from '@prisma/client';
import { TipoOficinaIn } from 'dtos/TipoOficinaDTO';

const prisma = new PrismaClient();

export default class TipoOficinaModel {

  create = async (tipooficina : TipoOficinaIn) => {
    return await prisma.tipo_oficina.create({
      data : {
        tof_nome : tipooficina.tof_nome
      }
    });
  }

  getAll = async () => {
    return await prisma.tipo_oficina.findMany();
  }

  get = async (tof_id: number) => {
    return await prisma.tipo_oficina.findUnique({
      where: {
        tof_id
      }
    });
  }

  delete = async (tof_id: number) => {
    return await prisma.tipo_oficina.delete({
      where: {
        tof_id
      }
    })
  }

  update = async (tof_id: number, tipooficina: TipoOficinaIn) => {
    return await prisma.tipo_oficina.update({
      where: {
        tof_id
      },
      data: {
        ...tipooficina
      }
    })
  }
};