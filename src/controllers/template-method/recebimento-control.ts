import { PrismaClient } from '@prisma/client';
import { TransacaoBodyRequest } from 'dtos/transacao/transacao';
import { RecebimentoModel } from 'models/transacoes/recebimento-model';
import { Template } from './template-method';

const recebimentoModel = new RecebimentoModel();

export class RecebimentoControl extends Template {
  public async atualizaConta(transacao: TransacaoBodyRequest, prisma: PrismaClient): Promise<boolean> {
    try {
      let response = await recebimentoModel.create(transacao, prisma);

      return response ? true : false;
    } catch (e) {
      return false;
    }
  }
}
