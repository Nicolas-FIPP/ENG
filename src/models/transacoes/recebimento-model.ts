import { PrismaClient } from '@prisma/client';
import { TransacaoBodyRequest } from 'dtos/transacao/transacao';
import PixModel from './strategy/pix-model';

const pixModel = new PixModel();

export class RecebimentoModel {
  create = async (transacao: TransacaoBodyRequest, prisma: PrismaClient) => {
    let valorAtualizado = pixModel.receber(transacao);
    transacao.valor = valorAtualizado;
    let responsePrisma = await prisma.contasReceber.create({
      data: {
        valor: valorAtualizado,
      },
    });

    return responsePrisma;
  };
}
