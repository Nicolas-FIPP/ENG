import { Request, Response } from "express";
import { pessoaIn, pessoaOut } from "dtos/PessoaDTO";
import { PessoaJuridicaIn } from "dtos/JuridicaDTO";
import { PessoaFisicaIn } from "dtos/FisicaDTO";
import PessoaModel from "models/PessoaModel";
import PessoaJuridicaModel from "models/JuridicaModel";
import PessoaFisicaModel from "models/FisicaModel";

const pessoaModel = new PessoaModel();
const pessoaFisicaModel = new PessoaFisicaModel();
const pessoaJuridicaModel = new PessoaJuridicaModel();

export default class PessoaController {
  create = async (req: Request, res: Response) => {
    try {

      const pessoa: pessoaIn = req.body;
      if(pessoaModel.ValidaEmail(pessoa.email)){

        if (pessoa.cpf && pessoa.pessoaFisica) {
          pessoa.cpf = pessoa.cpf.replace(/[^\d]/g, '');
          if (pessoaFisicaModel.validaCpf(pessoa.cpf)) {

            const newPessoa: pessoaOut = await pessoaModel.create(pessoa);
            const pessoaFisica: PessoaFisicaIn = {
              id: newPessoa.id,
              cpf: pessoa.cpf,
              dt_nasc: new Date(pessoa.pessoaFisica.dt_nasc),
              sexo: pessoa.pessoaFisica.sexo,
              rg: pessoa.pessoaFisica.rg
            };
  
            const newPessoaFisica = await pessoaFisicaModel.createPessoaFisica(pessoaFisica);
            return res.status(201).json(newPessoaFisica);
          } else {
            return res.status(400).json({ message: "CPF Inválido" });
          }
        }
  
        if (pessoa.cnpj && pessoa.pessoaJuridica) {
         
          const newPessoa: pessoaOut = await pessoaModel.create(pessoa);
  
          const pessoaJuridica: PessoaJuridicaIn = {
            id: newPessoa.id,
            cnpj: pessoa.cnpj,
            insc_estadual: pessoa.pessoaJuridica.insc_estadual,
            site: pessoa.pessoaJuridica.site,
            razao_social: pessoa.pessoaJuridica.razao_social
          };
  
          const newPessoaJuridica = await pessoaJuridicaModel.createPessoaJuridica(pessoaJuridica);
          return res.status(201).json(newPessoaJuridica);
        }
  
        return res.status(400).json({ message: "Tipo de pessoa inválido" });


      }
      else{
        return res.status(400).json({ message: "Email Inválido" });

      }


    } catch (e) {
      console.error("Failed to create pessoa", e);
      return res.status(500).send({
        error: "PESSOA-01",
        message: "Failed to create pessoa",
      });
    }
  };



  getAll = async (req: Request,res: Response) => {
    
    try {
      const pessoas = await pessoaModel.getAll();
      res.status(200).json(pessoas);
    } catch (e) {
      console.log("Failed to get all users", e);
      res.status(500).send({
        error: "USR-03",
        message: "Failed to get all users",
      });
    }
  };
  /*

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
  };*/
  

  update = async (req: Request, res: Response) => {
    try {
      const id:number = req.body.id;
      const pessoa: pessoaIn = req.body;
      if(pessoaModel.ValidaEmail(pessoa.email)){
        if (pessoa.cpf && pessoa.pessoaFisica) {
          pessoa.cpf = pessoa.cpf.replace(/[^\d]/g, '');
          if (pessoaFisicaModel.validaCpf(pessoa.cpf)) {

            const updatePessoa: pessoaOut = await pessoaModel.update(id,pessoa);

            const pessoaFisica: PessoaFisicaIn = {
              id:id,
              cpf: pessoa.cpf,
              dt_nasc: new Date(pessoa.pessoaFisica.dt_nasc),
              sexo: pessoa.pessoaFisica.sexo,
              rg: pessoa.pessoaFisica.rg
            };

            const newPessoaFisica = await pessoaFisicaModel.update(id,pessoaFisica);
            return res.status(201).json(newPessoaFisica);
          } else {
            return res.status(400).json({ message: "CPF Inválido" });
          }
        }

        if (pessoa.cnpj && pessoa.pessoaJuridica) {
        
          const updatePessoa: pessoaOut = await pessoaModel.update(id,pessoa);

          const pessoaJuridica: PessoaJuridicaIn = {
            id: id,
            cnpj: pessoa.cnpj,
            insc_estadual: pessoa.pessoaJuridica.insc_estadual,
            site: pessoa.pessoaJuridica.site,
            razao_social: pessoa.pessoaJuridica.razao_social
          };

          const newPessoaJuridica = await pessoaJuridicaModel.update(id,pessoaJuridica);
          return res.status(201).json(newPessoaJuridica);
        }
      }
      else{
        return res.status(400).json({ message: "Email Inválido" });

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
      const id: number = parseInt(req.body.id);
      const userDeleted = await pessoaModel.delete(id);
      res.status(201).json({message: "ok"});
    } catch (e) {
      console.log("Failed to delete user", e);
      res.status(500).send({
        error: "USR-05",
        message: "Failed to delete user",
      });
    }
  };
  




}
