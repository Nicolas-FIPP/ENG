import { HttpStatusCode } from 'axios';
import { PessoaInteressadaBodyRequest } from 'dtos/pessoa-interessada/request';
import { Request, Response } from 'express';
import EventoModel from 'models/EventoModel';

const eventoModel = new EventoModel();

export default class PessoaInteressadaControl {
  public add = async (req: Request, res: Response) => {
    try {
      const pessoaInteressada: PessoaInteressadaBodyRequest = req.body;
      const response = await eventoModel.add(pessoaInteressada);

      if (response) {
        return res.status(HttpStatusCode.Created).json(response);
      }

      return res.status(HttpStatusCode.InternalServerError).send();
    } catch (e) {
      return res.status(HttpStatusCode.InternalServerError).json(e);
    }
  };

  public remove = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      const response = await eventoModel.remove(email);

      if (response) {
        return res.status(HttpStatusCode.Created).json(response);
      }

      return res.status(HttpStatusCode.InternalServerError).send();
    } catch (e) {
      return res.status(HttpStatusCode.InternalServerError).json(e);
    }
  };
}
