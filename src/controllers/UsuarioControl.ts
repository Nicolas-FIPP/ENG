import { UsuarioIn, UsuarioOut } from "dtos/UsuarioDTO";
import { Request, Response } from "express";
import FisicaModel from "models/FisicaModel";
import PessoaModel from "models/PessoaModel";
import UsuarioModel from "models/UsuarioModel";

const jwt = require('jsonwebtoken');


const usuarioModel = new UsuarioModel();
const fisicaModel = new FisicaModel();
const pessoaModel = new PessoaModel();

export default class UsuarioControl{
    create = async( req: Request, res: Response) => {
        try{
            const bcrypt = require('bcrypt');

            const usuario : UsuarioIn = {
                cpf: req.body.cpf.replace(/[^\d]/g, ''),
                senha: await bcrypt.hash(req.body.senha, 10),
                nivel_acesso: Number(req.body.nivel_acesso)
            }
            
            const fisica = await fisicaModel.getByCpf(usuario.cpf);
            if(!fisica){
                return res.status(404).send({message: "Cadastro de pessoa não encontrado."});
            }
            
            const usuarioExistente : UsuarioOut | null = await usuarioModel.getByFisicaId(fisica.pes_id);
            if(usuarioExistente){
                return res.status(500).send({message: "A pessoa indicada já possui um usuário criado no sistema."});
            }
            usuario.pes_id = fisica.pes_id;
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
        const usuario = {
            cpf: req.body.cpf.replace(/[^\d]/g, ''),
            senha: req.body.senha
        }
        console.log(usuario)
        const fisica = await fisicaModel.getByCpf(usuario.cpf);
        if(!fisica){
            return res.status(500).send({message: "CPF não cadastrado. Faça o cadastro de pessoa."});
        }

        const usuarioDb = await usuarioModel.getByFisicaId(fisica.pes_id);
        if(!usuarioDb){
            return res.status(500).send({message: "CPF e/ou senha inválidos."});
        }

        const pessoa = await pessoaModel.getById(usuarioDb.pes_id);
        if(!pessoa?.status){
            return res.status(500).send({message: "Cadastro de PESSOA inativo."});
        }

        const verificaSenha: boolean = await usuarioModel.verificaSenha(usuario.senha, usuarioDb.senha); 
        if(!verificaSenha){
            return res.status(500).send({message: "CPF e/ou senha inválidos."});
        }

        if(!usuarioDb.status){
            return res.status(500).send({message: "Usuário inativo."});
        }
      
        const secret = process.env.SECRET_JWT;

        const token = jwt.sign({id: usuarioDb.id, nivel: usuarioDb.nivel_acesso},secret || ' ', {expiresIn: '2h'});

        return res.status(200).json(token);
    }

    get = async (req: Request, res: Response) => {
        if(req.body.nivel !== 1){
            return res.status(401).send({message: "Não autorizado."});
        }
        try{
            const usuario = await usuarioModel.getById(Number(req.params.id));

            if(!usuario){
                return res.status(404).send({message: "Usuário não encontrado."});
            }

            return res.status(200).json(usuario);

        }catch(error){
            return res.status(500).send({message: "Não foi possível obter o usuário."});
        }
    }

    getAll = async(req: Request, res: Response) => {
        /*if(req.body.nivel !== 1){
            return res.status(401).send({message: "Não autorizado."});
        }*/
        try{
            const usuarios = await usuarioModel.getAll();

            if(!usuarios){
                return res.status(404).send({message: "Não há usuários para listar."});
            }
        
            const usuariosAtivos = usuarios.filter(usuario => usuario.status);

            for(const object of usuariosAtivos){
                const objetoFisica = await fisicaModel.getCpfByPesId(object.pes_id);
                Reflect.set(object, 'cpf', objetoFisica?.cpf);
            }

            return res.status(200).json(usuariosAtivos);
        }catch(error){
            return res.status(500).send({message: "Não foi possível obter os usuários."});
        }
    }

    inativar = async (req: Request, res: Response) => {
        /*if(req.body.nivel !== 1){
            return res.status(401).send({message: "Não autorizado."});
        }*/

        try{
            console.log(req.params.id)
            const usuario = await usuarioModel.deleteLogico(Number(req.params.id));

            if(!usuario){
                return res.status(404).send({message: "Usuário não encontrado."});
            }

            return res.status(200).send({message: "Usuário foi inativado."});
        }catch(error){
            return res.status(500).send({message: "Não foi possível deletar o usuário."});
        }
    }
}