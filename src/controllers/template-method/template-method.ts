import { PrismaClient } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { TransacaoBodyRequest } from 'dtos/transacao/transacao';
import { Request, Response } from 'express';
import CaixaModel from 'models/transacoes/caixa-model';
import { MovimentoCaixaModel } from 'models/transacoes/mov-caixa-model';

const prismaConection = new PrismaClient();
const caixaModel = new CaixaModel();
const movimentoCaixaModel = new MovimentoCaixaModel();

export abstract class Template {
  //metodo final
  public async quitar(req: Request, res: Response): Promise<Response> {
    let sucesso = false;
    let transacao: TransacaoBodyRequest = req.body;

    if (caixaModel.aberto) {
      await prismaConection.$transaction(async () => {
        if (await this.atualizaConta(transacao, prismaConection)) {
          if (await this.criaMovimento(transacao, prismaConection)) {
            this.atualizaSaldo(caixaModel, transacao);
            sucesso = true;
          }
        }
      });
    }

    return sucesso
      ? res.status(HttpStatusCode.Ok).json()
      : res.status(HttpStatusCode.BadRequest).json({ message: 'Algo deu Errado' });
  }

  public abstract atualizaConta(transacao: TransacaoBodyRequest, prisma: PrismaClient): Promise<boolean>;

  public atualizaSaldo(caixaModel: CaixaModel, transacao: TransacaoBodyRequest): void {
    transacao.tipo ? (caixaModel.montante += transacao.valor) : (caixaModel.montante -= transacao.valor);
  }

  public async criaMovimento(transacao: TransacaoBodyRequest, prisma: PrismaClient): Promise<boolean> {
    try {
      let status: boolean = transacao.tipo == undefined ? false : true; // STATUS TRUE + POSITIVO & FALSE - NEGATIVO
      let prismaResponse = await movimentoCaixaModel.create(transacao.valor, status, prisma);

      if (prismaResponse) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
