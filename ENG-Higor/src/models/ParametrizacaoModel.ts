import { PrismaClient } from '@prisma/client';
import { ParametrizacaoDTO } from 'dtos/ParametrizacaoDTO';

const prisma = new PrismaClient();

export default class ParametrizacaoModel {
  create = async (parametrizacao: ParametrizacaoDTO) => {
    return await prisma.parametrizacao.create({
      data: parametrizacao,
    });
  }

  get = async () => {
    return await prisma.parametrizacao.findFirst();
  }

  update = async (parametrizacao: ParametrizacaoDTO) => {
    const existingRecord = await prisma.parametrizacao.findFirst();
    if (!existingRecord) {
      throw new Error("Registro não encontrado.");
    }

    return await prisma.parametrizacao.update({
      where: {
        pes_id: existingRecord.pes_id,
      },
      data: parametrizacao,
    });
  }
}
