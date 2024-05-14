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
      console.log("antes de gravar")
      res.status(201).json(newTipoOficina);
      console.log("dps de gravar")
    } catch (e) {
      console.log("Failed to create tipo_oficina", e);
      res.status(500).send({
        error: "USR-01",
        message: "Failed to create tipo_oficina",
      });
    }
  };
/*
  get = async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id);
      const newUser: UserOut | null = await userModel.get(id);

      if (newUser) {
        res.status(200).json(newUser);
      } else {
        res.status(404).json({
          error: "USR-06",
          message: "User not found.",
        });
      }
    } catch (e) {
      console.log("Failed to get user", e);
      res.status(500).send({
        error: "USR-02",
        message: "Failed to get user",
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const users: UserOut[] | null = await userModel.getAll();
      res.status(200).json(users);
    } catch (e) {
      console.log("Failed to get all users", e);
      res.status(500).send({
        error: "USR-03",
        message: "Failed to get all users",
      });
    }
  };

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
