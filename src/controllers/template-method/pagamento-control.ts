import { PrismaClient } from '@prisma/client';
import { TransacaoBodyRequest } from 'dtos/transacao/transacao';
import { PagamentoModel } from 'models/transacoes/pagamento-model';
import { Template } from './template-method';

const pagamentoModel = new PagamentoModel();

export class PagamentoControl extends Template {
  public async atualizaConta(transacao: TransacaoBodyRequest, prisma: PrismaClient): Promise<boolean> {
    try {
      let response = await pagamentoModel.create(transacao, prisma);

      return response ? true : false;
    } catch (e) {
      return false;
    }
  }
}
