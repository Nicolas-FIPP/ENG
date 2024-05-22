import { Request, Response } from "express";
import { PessoaFisica, PessoaJurdica, PessoaIn, PessoaOut } from "dtos/PessoaDTO";
import PessoaModel from "models/PessoaModel";

const pessoaModel = new PessoaModel();

export default class PessoaController {
  create = async (req: Request, res: Response) => {

    try {
      const pessoa: PessoaIn = req.body;
  
      const newPessoa: PessoaOut = await pessoaModel.create(pessoa);


      if(pessoa.cnpj){
        if(pessoa.pessoaJuridica){
          const pessoaJurdica : PessoaJurdica = {
            pes_id: newPessoa.id,
            cnpj: pessoa.cnpj,
            insc_estadual: pessoa.pessoaJuridica.insc_estadual,
            site: pessoa.pessoaJuridica.site,
            razao_social: pessoa.pessoaJuridica.razao_social
          }
          console.log(pessoaJurdica)

          const newPessoaJuridica : PessoaJurdica = await pessoaModel.createPessoaJuridica(pessoaJurdica);
          res.status(201).json(newPessoaJuridica);
        } 
      }
      if(pessoa.cpf){
        if(pessoa.pessoaFisica){
          const pessoaFisica : PessoaFisica = {
            pes_id: newPessoa.id,
            cpf: pessoa.cpf,
            dt_nasc: new Date( pessoa.pessoaFisica.dt_nasc),
            sexo: pessoa.pessoaFisica.sexo,
            rg: pessoa.pessoaFisica.rg
          }
          const newPessoaFisica : PessoaFisica = await pessoaModel.createPessoaFisica(pessoaFisica);
          res.status(201).json(newPessoaFisica);

        }
      }
     


      

      
    } catch (e) {
      console.log("Failed to create user", e);
      res.status(500).send({
        error: "USR-01",
        message: "Failed to create user",
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
