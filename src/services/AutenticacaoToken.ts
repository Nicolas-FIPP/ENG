import { NextFunction, Request, Response } from "express";
import UsuarioModel from "models/UsuarioModel";

const jwt = require('jsonwebtoken');

type jwtPayLoad = {
    id: number;
    nivel: number;
}

export async function autenticacaoToken(req: Request, res: Response, next: NextFunction){
    const usuarioModel = new UsuarioModel();
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({message: "Não autorizado."});
    }

    const token = authorization.split(' ')[1];
    

    const { id, nivel } = jwt.verify(token, process.env.SECRET_JWT) as jwtPayLoad;


    const usuario = await usuarioModel.getById(id);

    if(!usuario){
        return res.status(401).json({message: "Não autorizado."});
    }

    req.body.id = id;
    req.body.nivel = nivel;
    next();

}
