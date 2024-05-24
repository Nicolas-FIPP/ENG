import { Request, Response } from "express";
import ParametrizacaoModel from "models/ParametrizacaoModel";
import { ParametrizacaoDTO } from 'dtos/ParametrizacaoDTO';

const ParametrizacaoMod = new ParametrizacaoModel();

export default class ParametrizacaoController {
  create = async (req: Request, res: Response) => {
    try {
      const registros = await prisma.ParametrizacaoMod.get();

      if( registros.length > 0)
      {
          console.log('Já existe um registro na tabela.');
          return;
      }
      const Parametrizacao: ParametrizacaoDTO = req.body;
      console.log(Parametrizacao);
      const newParametrizacao: ParametrizacaoDTO = await ParametrizacaoMod.create(Parametrizacao);
      res.status(201).json(newParametrizacao);
    } catch (e) {
      console.log("Falha ao criar parametrizacao", e);
      res.status(500).send({
        error: "USR-01",
        message: "Falha ao criar parametrizacao",
      })
    }
  }

  get = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      console.log(id);
      let newParametrizacao: ParametrizacaoDTO | null = await ParametrizacaoMod.get(id);

      if (newParametrizacao) {
        res.status(200).json(newParametrizacao);
      } else {
        res.status(404).json({
          error: "USR-06",
          message: "parametrizacao não encontrada.",
        })
      }
    } catch (e) {
      console.log("Falha ao recuperar parametrizacao", e);
      res.status(500).send({
        error: "USR-02",
        message: "Falha ao recuperar parametrizacao",
      })
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const pes_id: number = parseInt(req.params.pes_id); // Assume que o ID da parametrização está nos parâmetros da requisição
      const parametrizacaoDTO: ParametrizacaoDTO = req.body; // Assume que os novos dados da parametrização estão no corpo da requisição

      const updatedParametrizacao = await ParametrizacaoMod.update(pes_id, parametrizacaoDTO);
      
      if (!updatedParametrizacao) {
        res.status(404).json({ message: 'Parametrização não encontrada' });
      } else {
        res.status(200).json(updatedParametrizacao); // Retorna a parametrização atualizada
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar parametrização'});
    }
  }


    async delete(req: Request, res: Response): Promise<void> {
    try {
      const pes_id: number = parseInt(req.params.pes_id); 

      const deletedParametrizacao = await ParametrizacaoMod.delete(pes_id);
      
      if (!deletedParametrizacao) {
        res.status(404).json({ message: 'Parametrização não encontrada' });
      } else {
        res.status(200).json({ message: 'Parametrização excluída com sucesso' }); 
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir parametrização', error: error.message });
    }
  }

}
