import { Request, Response } from "express";
import OficinaModel from "models/Oficina";
import { TipoOficinaIn, TipoOficinaOut } from 'dtos/TipoOficinaDTO';
import { OficinaeMatriculados, OficinaIn, OficinaOut } from "dtos/OficinaDTO";
import MatriculaModel from "models/matriculaModel";
import { MatriculaDTO } from "dtos/Oficina/matriculaDTO";
import PessoaController from "./PessoaController";
import PessoaModel from "models/PessoaModel";
import { PrismaClient } from "@prisma/client"
const oficinaModel = new OficinaModel();

const matriculaModel = new MatriculaModel ()


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

   cadastroMatriculado = async (req: Request, res: Response) => {

    let {pes_id,ofi_id} = req.body



    if(pes_id == null || ofi_id == null){
      res.status(400).json({message: 'Faltando infos'});
    } 

    pes_id = parseInt(pes_id)
    ofi_id = parseInt(ofi_id)


    const criado_em = new Date()
    

    const prisma = new PrismaClient();
    console.log(req.body)
    const jaCadastrou =  await matriculaModel.jaCadastrou(pes_id,ofi_id)
    console.log(jaCadastrou)
    if (jaCadastrou !== null){
      return res.status(400).json({})
    }

    await matriculaModel.create({criado_em,pes_id,ofi_id  })

    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    return res.status(200).json({})
  }


  mostrarMatriculascomoficinas = async (req: Request, res: Response) => {
    
    
    const pessoas= await oficinaModel.getListatodasOficinasComMatriculadosENomes()
    res.status(200).json(pessoas)

  }


  deletarmatricula = async (req: Request, res: Response) => {
    
    
    const id: number = parseInt(req.params.id);
    const matricula = await oficinaModel.deleteMatricula(id);
    res.status(204).json(matricula);

  }
}