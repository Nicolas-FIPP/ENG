import { FisicaOut } from "dtos/FisicaDTO";
import { UsuarioIn, UsuarioOut } from "dtos/UsuarioDTO";
import { Request, Response } from "express";
import FisicaModel from "models/FisicaModel";
import UsuarioModel from "models/UsuarioModel";

const jwt = require('jsonwebtoken');


const usuarioModel = new UsuarioModel();
const fisicaModel = new FisicaModel();


export default class UsuarioControl{
    create = async( req: Request, res: Response) => {
        try{
            const bcrypt = require('bcrypt');

            const usuario : UsuarioIn = {
                pes_id: Number(req.body.pes_id),
                senha: await bcrypt.hash(req.body.senha, 10),
                nivel_acesso: Number(req.body.nivel_acesso)
            }
            
            const fisica : FisicaOut | null = await fisicaModel.getById(usuario.pes_id);
            if(!fisica){
                return res.status(404).send({message: "Cadastro de pessoa não encontrado."});
            }
            
            const usuarioExistente : UsuarioOut | null = await usuarioModel.getByFisicaId(usuario.pes_id);
            if(usuarioExistente){
                return res.status(500).send({message: "A pessoa indicada já possui um usuário criado no sistema."});
            }

            const newUsuario : UsuarioOut = await usuarioModel.create(usuario);
            if(!newUsuario){
                return res.status(500).send({message: "Falha ao criar usuário."});
            }

            return res.status(201).send({message: "Usuário criado."});
        }catch(e){
            console.log(e);
            return res.status(500).send({message: "Falha ao criar usuário."});
        }
    };

    login = async(req: Request, res: Response) => {
        const usuario = req.body;

        const fisica = await fisicaModel.getByCpf(usuario.cpf);
        if(!fisica){
            return res.status(500).send({message: "CPF não cadastrado. Faça o cadastro de pessoa."});
        }

        const usuarioDb = await usuarioModel.getByFisicaId(fisica.pes_id);
        if(!usuarioDb){
            return res.status(500).send({message: "CPF e/ou senha inválidos."});
        }

        const verificaSenha: boolean = await usuarioModel.verificaSenha(usuario.senha, usuarioDb.senha); 
        if(!verificaSenha){
            return res.status(500).send({message: "CPF e/ou senha inválidos."});
        }

        if(!usuarioDb.status){
            return res.status(402).send({message: "Usuário inativo."});
        }

        const secret = process.env.SECRE_JWT;
        const token = jwt.sign({id: usuarioDb.id}, secret || ' ', {expiresIn: '2h'});

        return res.status(200).json(token);
    }
}