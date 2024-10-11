import { HttpStatusCode } from 'axios';
import { alterarSenhaUsuarioRequest, createUserBodyRequest, loginUsuarioRequest } from 'dtos/usuario/request';
import { AccessLevels, UsuarioCreateBody, UsuarioLoginBody } from 'dtos/usuario/usuario.dto';
import { Request, Response } from 'express';
import FisicaModel from 'models/FisicaModel';
import PessoaModel from 'models/PessoaModel';
import UsuarioModel from 'models/usuario-model';

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
      const usuarioCriado = await usuarioModel.create(novoUsuarioBody);
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
    try {
      const usuario = await usuarioModel.getById(Number(req.params.id));
      if (!usuario) {
        return res.status(HttpStatusCode.NotFound).json({ message: 'Usuário não encontrado.' });
      }

      if (usuario.nivel_acesso === AccessLevels.admin) {
        const admins = await usuarioModel.getAllAdmins(AccessLevels.admin);
        if (admins.length === 1) {
          return res.status(HttpStatusCode.BadRequest).json({ message: 'Não é possível excluir todos os admins.' });
        }
      }

      await usuarioModel.deleteLogico(Number(req.params.id));

      return res.status(HttpStatusCode.Ok).json({ message: 'Usuário foi inativado.' });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({ message: 'Não foi possível deletar o usuário.' });
    }
  };

  alterarSenha = async (req: Request, res: Response) => {
    const usuarioParsed = alterarSenhaUsuarioRequest.safeParse(req.body);
    if (!usuarioParsed.success) {
      return res.status(HttpStatusCode.BadRequest).json(usuarioParsed.error.format());
    }

    const usuario = await usuarioModel.getById(usuarioParsed.data.id);
    if (!usuario) {
      return res.status(HttpStatusCode.NotFound).send({ message: 'Usuário não encontrado.' });
    }

    const match = await bcrypt.compare(usuarioParsed.data.nova_senha, usuario.senha);
    if (!match) {
      return res.status(HttpStatusCode.BadRequest).send({ message: 'A senha atual está incorreta.' });
    }

    usuarioParsed.data.nova_senha = await bcrypt.hash(usuarioParsed.data.nova_senha, 10);
    await usuarioModel.alterarSenha(usuarioParsed.data.id, usuarioParsed.data.nova_senha);

    return res.status(HttpStatusCode.Ok).json({ message: 'Senha alterada.' });
  };
}
