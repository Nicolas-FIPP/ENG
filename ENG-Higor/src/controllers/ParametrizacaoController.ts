import { Request, Response } from "express";
import ParametrizacaoModel from "models/ParametrizacaoModel";
import { ParametrizacaoDTO } from 'dtos/ParametrizacaoDTO';

const parametrizacaoMod = new ParametrizacaoModel();

export default class ParametrizacaoController {
  create = async (req: Request, res: Response) => {
    try {
      const existingParametrizacao = await parametrizacaoMod.get();
      if (existingParametrizacao) {
        console.log('Já existe um registro na tabela.');
        return res.status(400).json({
          error: "USR-05",
          message: "Já existe um registro na tabela.",
        });
      }

      const parametrizacao: ParametrizacaoDTO = req.body;
      console.log(parametrizacao);

      const newParametrizacao: ParametrizacaoDTO = await parametrizacaoMod.create(parametrizacao);
      res.status(201).json(newParametrizacao);
    } catch (e) {
      console.log("Falha ao criar parametrizacao", e);
      res.status(500).send({
        error: "USR-01",
        message: "Falha ao criar parametrizacao",
      });
    }
  }

  get = async (req: Request, res: Response) => {
    try {
      const parametrizacao: ParametrizacaoDTO | null = await parametrizacaoMod.get();

      if (parametrizacao) {
        res.status(200).json(parametrizacao);
      } else {
        res.status(404).json({
          error: "USR-06",
          message: "Parametrizacao não encontrada.",
        });
      }
    } catch (e) {
      console.log("Falha ao recuperar parametrizacao", e);
      res.status(500).send({
        error: "USR-02",
        message: "Falha ao recuperar parametrizacao",
      });
    }
  }

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const parametrizacaoDTO: ParametrizacaoDTO = req.body;

      const updatedParametrizacao = await parametrizacaoMod.update(parametrizacaoDTO);

      res.status(200).json(updatedParametrizacao);
    } catch (e) {
      console.log("Erro ao atualizar parametrizacao", e);
      res.status(500).json({ message: e || 'Erro ao atualizar parametrização' });
    }
  }
}
