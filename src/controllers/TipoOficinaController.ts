import { Request, Response } from "express";
import TipoOficinaModel from "models/TipoOficinaModel";
import { TipoOficinaIn, TipoOficinaOut } from 'dtos/TipoOficinaDTO';

const tipooficinaModel = new TipoOficinaModel();

export default class TipoOficinaController {
  create = async (req: Request, res: Response) => {
    try {
      const TipoOficina: TipoOficinaIn = req.body;
      console.log(TipoOficina);
      const newTipoOficina: TipoOficinaOut = await tipooficinaModel.create(TipoOficina);
      res.status(201).json(newTipoOficina);
    } catch (e) {
      console.log("Failed to create Tipo_Oficina", e);
      res.status(500).send({
        error: "USR-01",
        message: "Failed to create Tipo_Oficina",
      });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      let newTipoOficina: TipoOficinaOut | null = await tipooficinaModel.get(id);

      if (newTipoOficina?.id == id) {
        res.status(200).json(newTipoOficina);
      } else {
        res.status(404).json({
          error: "USR-06",
          message: "Tipo_Oficina not found.",
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
      const Tipo_Oficina_s: TipoOficinaOut[] | null = await tipooficinaModel.getAll();
      res.status(200).json(Tipo_Oficina_s);
    } catch (e) {
      console.log("Failed to get all Tipo_Oficina_s", e);
      res.status(500).send({
        error: "USR-03",
        message: "Failed to get all Tipo_Oficina_s",
      });
    }
  };
/*
  update = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      const updateUser: UserIn = req.body;
      const userUpdated: UserOut | null = await userModel.update(
        id,
        updateUser
      );

      if (userUpdated) {
        res.status(200).json(userUpdated);
      } else {
        res.status(404).json({
          error: "USR-06",
          message: "User not found.",
        });
      }
    } catch (e) {
      console.log("Failed to update user", e);
      res.status(500).send({
        error: "USR-04",
        message: "Failed to update user",
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      const userDeleted = await userModel.delete(id);
      res.status(204).json(userDeleted);
    } catch (e) {
      console.log("Failed to delete user", e);
      res.status(500).send({
        error: "USR-05",
        message: "Failed to delete user",
      });
    }
  };*/
}
