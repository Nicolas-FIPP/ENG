import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { MovimentoCaixaModel } from 'models/transacoes/mov-caixa-model';

const movCaixaModel = new MovimentoCaixaModel();

export class MovCaixaControl {
  public async getAll(req: Request, res: Response) {
    let response = await movCaixaModel.getAll();

    return response ? res.status(HttpStatusCode.Ok).json(response) : res.status(HttpStatusCode.BadRequest);
  }
}
