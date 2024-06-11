import { Request, Response } from "express";
import DespesaModel from "models/DespesaModel";


const despesaModel = new DespesaModel();

export default class DespesaControl{
    create = async (req: Request, res: Response) => {
        
        try{
            const despesa = req.body;
            
             despesa.dt_pagamento = new Date(despesa.dt_pagamento);
             despesa.dt_vencimento = new Date(despesa.dt_vencimento);

            const despesaOut = despesaModel.create(despesa);

            if(!despesaOut){
                return res.status(400).json({message: "Falha ao criar Despesa."});
            }

            return res.status(200).json(despesaOut); 
        }
        catch(error){
            return res.status(500).json({message: "Falha ao criar Despesa."});
        }
    }

    alterar = async (req: Request, res: Response) => {
        try{
            const despesa = req.body;

            despesa.dt_pagamento = new Date(despesa.dt_pagamento);
            despesa.dt_vencimento = new Date(despesa.dt_vencimento);

            const despesaOut = despesaModel.update(despesa);

            if(!despesaOut){
                return res.status(400).json({message: "Falha ao criar Despesa."});
            }
            return res.status(200).json(despesaOut); 

        }catch(error){
            return res.status(500).json({message: "Falha ao alterar Despesa."});

        }
    }
}