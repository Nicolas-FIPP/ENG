import UsuarioControl from "controllers/UsuarioControl";
import { Router } from "express"
import { autenticacaoToken } from "services/AutenticacaoToken";

const routes = Router();

const usuarioControl = new UsuarioControl();


// Rota para cadastrar um usuário
routes.post('/cadastrar', usuarioControl.create);

// Rota para logar
routes.post('/login', usuarioControl.login)

// Rota para retornar um usuario pelo token TESTE
routes.get('/get-usuario', autenticacaoToken, )


export default routes;