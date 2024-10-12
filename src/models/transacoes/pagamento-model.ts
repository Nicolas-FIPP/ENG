import { PrismaClient } from '@prisma/client';
import { TransacaoBodyRequest } from 'dtos/transacao/transacao';

const prismaClient = new PrismaClient();
export class PagamentoModel {
  create = async (transacao: TransacaoBodyRequest, prisma: PrismaClient) => {
    return await prisma.contasPagar.create({
      data: {
        valor: transacao.valor,
      },
    });
  };

  getAll = async () => {
    return await prismaClient.contasPagar.findMany();
  };
}
