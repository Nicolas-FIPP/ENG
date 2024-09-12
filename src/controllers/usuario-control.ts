import { HttpStatusCode } from 'axios';
import { createUserBodyRequest, loginUsuarioRequest } from 'dtos/usuario/request';
import { UsuarioCreateBody, UsuarioLoginBody } from 'dtos/usuario/usuario.dto';
import { Request, Response } from 'express';
import FisicaModel from 'models/FisicaModel';
import PessoaModel from 'models/PessoaModel';
import UsuarioModel from 'models/UsuarioModel';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usuarioModel = new UsuarioModel();
const pessoaFisicaModel = new FisicaModel();
const pessoaModel = new PessoaModel();

export default class UsuarioControl {
  create = async (req: Request, res: Response) => {
    const usuarioParsed = createUserBodyRequest.safeParse(req.body);
    if (!usuarioParsed.success) {
      return res.status(HttpStatusCode.BadRequest).json(usuarioParsed.error.format());
    }

    try {
      const novoUsuarioBody: UsuarioCreateBody = {
        cpf: usuarioParsed.data.cpf.replace(/[^\d]/g, ''),
        senha: await bcrypt.hash(usuarioParsed.data.senha, 10),
        nivel_acesso: usuarioParsed.data.nivel_acesso,
      };

      const pessoaFisica = await pessoaFisicaModel.getByCpf(novoUsuarioBody.cpf);
      if (!pessoaFisica) {
        return res.status(HttpStatusCode.NotFound).json({ message: 'Cadastro de pessoa não encontrado.' });
      }

      const usuarioExistente = await usuarioModel.getByFisicaId(pessoaFisica.pes_id);
      if (usuarioExistente) {
        return res
          .status(HttpStatusCode.BadRequest)
          .json({ message: 'A pessoa indicada já possui um usuário criado no sistema.' });
      }

      novoUsuarioBody.pes_id = pessoaFisica.pes_id;
      const usuarioCriado: UsuarioCreateBody = await usuarioModel.create(novoUsuarioBody);
      if (!usuarioCriado) {
        return res.status(HttpStatusCode.InternalServerError).json({ message: 'Falha ao criar usuário.' });
      }

      return res.status(HttpStatusCode.Created).json({ message: 'Usuário criado.' });
    } catch (e) {
      console.log(e);
      return res.status(HttpStatusCode.InternalServerError).json({ message: 'Falha ao criar usuário.' });
    }
  };

  login = async (req: Request, res: Response) => {
    const usuarioParsed = loginUsuarioRequest.safeParse(req.body);
    if (!usuarioParsed.success) {
      return res.status(HttpStatusCode.BadRequest).json(usuarioParsed.error.format());
    }

    const usuario: UsuarioLoginBody = {
      cpf: usuarioParsed.data.cpf.replace(/[^\d]/g, ''),
      senha: usuarioParsed.data.senha,
    };

    const pessoaFisica = await pessoaFisicaModel.getByCpf(usuario.cpf);
    if (!pessoaFisica) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ message: 'CPF não cadastrado. Faça o cadastro de pessoa.' });
    }

    const usuarioDb = await usuarioModel.getByFisicaId(pessoaFisica.pes_id);
    if (!usuarioDb) {
      return res.status(HttpStatusCode.InternalServerError).json({ message: 'CPF e/ou senha inválidos.' });
    }

    const pessoa = await pessoaModel.getById(usuarioDb.pes_id);
    if (!pessoa?.status) {
      return res.status(HttpStatusCode.InternalServerError).json({ message: 'Cadastro de PESSOA inativo.' });
    }

    const verificaSenha: boolean = await usuarioModel.verificaSenha(usuario.senha, usuarioDb.senha);
    if (!verificaSenha) {
      return res.status(HttpStatusCode.InternalServerError).json({ message: 'CPF e/ou senha inválidos.' });
    }

    if (!usuarioDb.status) {
      return res.status(HttpStatusCode.InternalServerError).json({ message: 'Usuário inativo.' });
    }

    const secret = process.env.SECRET_JWT;
    const token = jwt.sign({ id: usuarioDb.id, nivel: usuarioDb.nivel_acesso }, secret || ' ', { expiresIn: '2h' });

    return res.status(HttpStatusCode.Ok).json('token:' + token);
  };

  get = async (req: Request, res: Response) => {
    try {
      const usuario = await usuarioModel.getById(Number(req.params.id));

      if (!usuario) {
        return res.status(HttpStatusCode.NotFound).json({ message: 'Usuário não encontrado.' });
      }

      return res.status(HttpStatusCode.Ok).json(usuario);
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({ message: 'Não foi possível obter o usuário.' });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const usuarios = await usuarioModel.getAll();

      if (!usuarios) {
        return res.status(HttpStatusCode.NotFound).json({ message: 'Não há usuários para listar.' });
      }

      const usuariosAtivos = usuarios.filter((usuario: any) => usuario.status);

      for (const object of usuariosAtivos) {
        const objetoFisica = await pessoaFisicaModel.getCpfByPesId(object.pes_id);
        Reflect.set(object, 'cpf', objetoFisica?.cpf);
      }

      return res.status(HttpStatusCode.Ok).json(usuariosAtivos);
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({ message: 'Não foi possível obter os usuários.' });
    }
  };

  inativar = async (req: Request, res: Response) => {
    /*if(req.body.nivel !== 1){
            return res.status(401).send({message: "Não autorizado."});
        }*/

    try {
      console.log(req.params.id);
      console.log('vvvvvvvvvvvvvvvv');

      const usuario = await usuarioModel.getById(Number(req.params.id));
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      if (usuario.nivel_acesso === 1) {
        const admins = await usuarioModel.getAllAdmins(1);
        if (admins.length === 1) {
          return res.status(400).json({ message: 'Não é possível excluir todos os admins.' });
        }
      }

      const usuarioDelete = await usuarioModel.deleteLogico(Number(req.params.id));

      return res.status(200).json({ message: 'Usuário foi inativado.' });
    } catch (error) {
      return res.status(500).json({ message: 'Não foi possível deletar o usuário.' });
    }
  };

  alterarSenha = async (req: Request, res: Response) => {
    /*if(req.body.nivel !== 1){
            return res.status(401).send({message: "Não autorizado."});
        }*/

    const id = req.body.id;
    const novaSenha = req.body.nova_senha;

    const usuario = await usuarioModel.getById(id);
    if (!usuario) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    /*const match = await bcrypt.compare(novaSenha, usuario.senha);
        if(!match){
            return res.status(400).send({message: "A senha tual está incorreta."});
        }*/
    await usuarioModel.alterarSenha(id, novaSenha);

    //Hash na nova senha

    return res.status(200).json({ message: 'Senha alterada.' });
  };
}
