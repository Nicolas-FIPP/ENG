import OficinaController from "controllers/OficinaControl";

import { Router } from "express";
import { autenticacaoToken } from "services/AutenticacaoToken";

const routes = Router();
const oficinaControl = new OficinaController();


// Rota para cadastrar uma Despesa

// Rota para listar todas as Despesas

// Rota para alterar uma Despesa

// Rota para excluir uma Despesa


// Rota para cadastrar uma oficina
routes.post('/cadastrar-oficina', oficinaControl.create);

// Rota para listar oficinas
routes.get('/listar-todos-oficina', autenticacaoToken, oficinaControl.getAll);

// Rota para alterar uma uma oficina
routes.put('/alterar-oficina', autenticacaoToken, );

// Rota para excluir uma uma oficina
routes.delete('/excluir-oficina', autenticacaoToken, )

export default routes;