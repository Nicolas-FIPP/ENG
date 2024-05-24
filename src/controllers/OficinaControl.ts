import { Request, Response } from "express";
import OficinaModel from "models/Oficina";
import { TipoOficinaIn, TipoOficinaOut } from 'dtos/TipoOficinaDTO';
import { OficinaIn, OficinaOut } from "dtos/OficinaDTO";

const oficinaModel = new OficinaModel();




export function verificarCamposPreenchidos(oficina: OficinaIn): boolean {
  
  if (
    oficina.limite === null ||
    oficina.disciplina.trim() === '' ||
    oficina.sala === null ||
    !oficina.dt_ini ||
    !oficina.dt_fim ||
    oficina.dias_funcionamento.trim() === '' ||
    !oficina.criado_em ||
    oficina.pes_id === null ||
    oficina.tof_id === null
  ) {

    return false;
  }
  return true;
}


export default class OficinaController {
  create = async (req: Request, res: Response) => {
    try {

      const Oficina: OficinaIn = req.body;
      console.log(Oficina);
      const newTipoOficina: OficinaOut = await oficinaModel.create(Oficina);

      console.log('aaaaaaaaaaaaaaa'+ newTipoOficina)
      res.status(201).json(newTipoOficina);

    } catch (e) {
      console.log("Failed to create Oficina", e);
      res.status(500).send({
        error: "USR-01",
        message: "Failed to create Oficina",
      });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      console.log(id);
      let newOficina: OficinaOut | null = await oficinaModel.get(id);
      if (newOficina) {
        res.status(200).json(newOficina);
      } else {
        res.status(404).json({
          error: "USR-06",
          message: "Oficina not found.",
        });
      }
    } catch (e) {
      console.log("Failed to get Tipo_Oficina", e);
      res.status(500).send({
        error: "USR-02",
        message: "Failed to get Tipo_Oficina",
      });
    }

  };

  getAll = async (req: Request, res: Response) => {
    try {
      const Oficina_s: OficinaOut[] | null = await oficinaModel.getAll();
      res.status(200).json(Oficina_s);
    } catch (e) {
      console.log("Failed to get all Tipo_Oficina_s", e);
      res.status(500).send({
        error: "USR-03",
        message: "Failed to get all Tipo_Oficina_s",
      });
    }
  };

  update = async (req: Request, res: Response) => {
        
    try {
      const id: number = parseInt(req.params.id);
      const updateOficina:  OficinaIn = req.body;
    
      





      const OficinaUpdated: OficinaOut | null = await oficinaModel.update(
        id,
        updateOficina
      );

      if (OficinaUpdated) {
        res.status(200).json(OficinaUpdated);
      } else {
        res.status(404).json({
          error: "USR-06",
          message: "Oficina não encontrada",
        });
      }
    } catch (e) {
      console.log("Falha ao atualizar  Oficina", e);
      res.status(500).send({
        error: "USR-04",
        message: "Falha ao atualizar  Oficina",
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      const OficinaDeleted = await oficinaModel.delete(id);
      res.status(204).json(OficinaDeleted);
    } catch (e) {
      console.log("Falha ao deletar Oficina", e);
      res.status(500).send({
        error: "USR-05",
        message: "Falha ao deletar Oficina",
      });
    }
  };
}