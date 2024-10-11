import { PrismaClient } from '@prisma/client';
import { TransacaoBodyRequest } from 'dtos/transacao/transacao';

export class PagamentoModel {
  create = async (transacao: TransacaoBodyRequest, prisma: PrismaClient) => {
    return await prisma.contasPagar.create({
      data: {
        valor: transacao.valor,
      },
    });
  };
}
