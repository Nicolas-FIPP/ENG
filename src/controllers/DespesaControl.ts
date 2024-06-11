import { Request, Response } from "express";
import DespesaModel from "models/DespesaModel";


const despesaModel = new DespesaModel();

export default class DespesaControl{
    create = async (req: Request, res: Response) => {
        
        try{
            const despesa = req.body;

            console.log(despesa)
            despesa.valor = Number(despesa.valor)
            despesa.dt_pagamento = new Date(despesa.dt_pagamento);
            despesa.dt_vencimento = new Date(despesa.dt_vencimento);

            const despesaOut = await despesaModel.create(despesa);

            if(!despesaOut){
                return res.status(400).json({message: "Falha ao criar Despesa."});
            }

            return res.status(201).json(despesaOut); 
        }
        catch(error){
            return res.status(500).json({message: "Falha ao criar Despesa."});
        }
    }

    alterar = async (req: Request, res: Response) => {
        try{
            const despesa = req.body;

            despesa.valor = Number(despesa.valor);
            despesa.tde_id = Number(despesa.tde_id);
            despesa.usu_id = Number(despesa.usu_id);
            despesa.des_id = Number(despesa.des_id);
            despesa.dt_pagamento = new Date(despesa.dt_pagamento);
            despesa.dt_vencimento = new Date(despesa.dt_vencimento);
            console.log(despesa)

            const despesaOut = await despesaModel.update(despesa);

            if(!despesaOut){
                return res.status(400).json({message: "Falha ao criar Despesa."});
            }
            return res.status(200).json(despesaOut); 

        }catch(error){
            return res.status(500).json({message: "Falha ao alterar Despesa."});

        }
    }

    deletar = async(req: Request, res: Response) => {
        try{
            const id = Number(req.params.id);

            console.log(id);
            
            const despesa = await despesaModel.delete(id);

            if(!despesa){
                return res.status(400).json({message: "Falha ao excluir Despesa."});
            }
            return res.status(200).json({message: "Despesa excluída"}); 

        }catch(error){
            return res.status(500).json({message: "Falha ao excluir Despesa."});
        }
    }

    getAll = async(req: Request, res: Response) => {
        try{
            const despesas = await despesaModel.getAll();

            return res.status(200).json(despesas); 

        }catch(error){
            return res.status(500).json({message: "Falha ao listar Despesas."});
        }
    }
}