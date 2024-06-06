import TipoDespesaControl from "controllers/TipoDespesaControl";
import { Router } from "express";
import { autenticacaoToken } from "services/AutenticacaoToken";

const routes = Router();
const tipoDespesaControl = new TipoDespesaControl();


// Rota para cadastrar uma Despesa

// Rota para listar todas as Despesas

// Rota para alterar uma Despesa

// Rota para excluir uma Despesa


// Rota para cadastrar um Tipo de Despesa
routes.post('/cadastrar-tipo', tipoDespesaControl.create);

// Rota para listar Tipos de Despesa
routes.get('/listar-todos-tipos', autenticacaoToken, tipoDespesaControl.getAll);

// Rota para alterar um Tipo de Despesa
routes.put('/alterar-tipo', autenticacaoToken, );

// Rota para excluir um Tipo de Despesa
routes.delete('/excluir-tipo', autenticacaoToken, )

export default routes;