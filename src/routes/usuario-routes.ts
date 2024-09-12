import UsuarioControl from 'controllers/usuario-control';
import { Router } from 'express';
//import { autenticacaoToken } from "services/AutenticacaoToken";

const routes = Router();

const usuarioControl = new UsuarioControl();

// Rota para cadastrar um usuário
routes.post('/', usuarioControl.create);

// Rota para logar
routes.post('/login', usuarioControl.login);

// Rota pra obterum usuário pelo id
//routes.get('/get-usuario/:id', autenticacaoToken, usuarioControl.get)

// Rota para listar todos os usuários
routes.get('/get-todos-usuarios', usuarioControl.getAll); //autenticacaoToken

// Rota para excluir logicamente um usuário
routes.put('/inativar-usuario/:id', usuarioControl.inativar); //autenticacaoToken

// Rota para alterar senha
routes.post('/alterar-senha', usuarioControl.alterarSenha);

export default routes;
