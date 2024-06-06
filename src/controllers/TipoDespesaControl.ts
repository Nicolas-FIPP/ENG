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

    delete = async(req: Request, res: Response) => {
        try{
            const id = Number(req.params.id);

            console.log("aaaaaaaaaaaaa")

            const despesa = await tipoDespesaModel.delete(id);

            return res.status(200).json({message: "Tipo de despesa excluído."});
        }catch(e){
            return res.status(500).json({message: "Falha ao excluir tipo de despesa."})
        }
    }

    update = async(req: Request, res: Response) => {
        try{
            const id = Number(req.params.id);
            const nome = req.body.nome;

            const despesa = await tipoDespesaModel.delete(id);
            if(!despesa){
                return res.status(404).json({message: "Tipo de despesa não encontrado."});
            }

            await tipoDespesaModel.update(id, nome);

            return res.status(200).json({message: "Tipo de despesa alterado."});

        }catch(e){
            return res.status(500).json({message: "Falha ao atualizar tipo de despesa."})
        }
    }
}
