import TipoDespesaModel from "models/TipoDespesaModel";
import { Request, Response } from "express";
import { TipoDespesaIn, TipoDespesaOut } from "dtos/TipoDespesaDTO";



const tipoDespesaModel = new TipoDespesaModel();

export default class TipoDespesaControl{
    create = async (req: Request, res: Response) => {
        try{
            const tipoDespesa : TipoDespesaIn = req.body;
            const newTipoDespesa: TipoDespesaOut = await tipoDespesaModel.create(tipoDespesa);

            return res.status(201).json(newTipoDespesa);
        }catch(e){
            return res.status(500).send({message: "Falha ao criar tipo de despesa."});
        }
    };

    getAll = async(req: Request, res: Response) => {
        try{
            const tiposDespesa = await tipoDespesaModel.getAll();

            return res.status(200).json(tiposDespesa);
        }catch(e){
            return res.status(500).json({message: "Falha ao listar tipos de despesa."})
        }
    }
}
