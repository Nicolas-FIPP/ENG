import { UsuarioIn, UsuarioOut } from "dtos/UsuarioDTO";
import { Request, Response } from "express";
import UsuarioModel from "models/UsuarioModel";

const jwt = require('jsonwebtoken');
const usuarioModel = new UsuarioModel();

export default class UsuarioControl{
    create = async( req: Request, res: Response) => {
        try{
            const usuario : UsuarioIn = req.body;
            const newUsuario : UsuarioOut = await usuarioModel.create(usuario);

            return res.status(201).json(newUsuario);
        }catch(e){
            return res.status(500).send({message: "Falha ao criar usuário."});
        }
    };

    login = async(req: Request, res: Response) => {
        const usuario = req.body;

        const usuarioDb = usuarioModel.getByCpf(usuario.cpf);
        if(!usuarioDb){
            return res.status(404).json({message: "Email e/ou senha inválidos."})
        }

        //const secret = process.env.SECRE_JWT;
        //const token = jwt.sign({id: usuarioDb.id}, secret || ' ', {expiresIn: '2h'});
        //return res.status(200).json(token);

    }
}