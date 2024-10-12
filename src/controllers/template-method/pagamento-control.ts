import { PrismaClient } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { TransacaoBodyRequest } from 'dtos/transacao/transacao';
import { Request, Response } from 'express';
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

  public async getAll(req: Request, res: Response) {
    let response = await pagamentoModel.getAll();

    response ? res.status(HttpStatusCode.Ok).json(response) : res.status(HttpStatusCode.BadRequest);
  }
}
