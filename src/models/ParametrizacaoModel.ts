import { PrismaClient } from '@prisma/client';
import { ParametrizacaoDTO } from 'dtos/ParametrizacaoDTO';

const prisma = new PrismaClient();

export default class ParametrizacaoModel {

  create = async (parametrizacao : ParametrizacaoDTO) => {
    return await prisma.oficina.create({
        data: parametrizacao,
    });
  }



  get = async (id: number) => {
    return await prisma.parametrizacao.get()
  }

  delete = async (id: number) => {
    return await prisma.parametrizacao.delete({
      where: {
        pes_id: id,
      }
    })
  }

  update = async (id: number, parametrizacao: ParametrizacaoDTO) => {
    return await prisma.oficina.update({
      where: {
        pes_id: id
      },
      data: {
        ...parametrizacao
      }
    })
  }
};