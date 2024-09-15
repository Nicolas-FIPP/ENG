import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import EventoModel from 'models/EventoModel';
import PessoaInteressadaModel from 'models/pessoa-interessada-model';

const eventoModel = new EventoModel();
const pessoaInteressadaModel = new PessoaInteressadaModel();

export default class PessoaInteressadaControl {
  create = async (req: Request, res: Response) => {
    try {
      // adicionar pessoa interessada no banco
      // chamar add observador eventoModel.add(pessoaInteressadaModel)
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError);
    }
  };

  getAll = async (req: Request, res: Response) => {};

  getByEmail = async (req: Request, res: Response) => {};

  deleteByEmail = async (req: Request, res: Response) => {};
}
