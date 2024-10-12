import { PrismaClient } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { TransacaoBodyRequest } from 'dtos/transacao/transacao';
import { Request, Response } from 'express';
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

  public async getAll(req: Request, res: Response) {
    let response = await recebimentoModel.getAll();

    response ? res.status(HttpStatusCode.Ok).json(response) : res.status(HttpStatusCode.BadRequest);
  }
}
