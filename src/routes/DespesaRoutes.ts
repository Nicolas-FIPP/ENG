import DespesaControl from "controllers/DespesaControl";
import TipoDespesaControl from "controllers/TipoDespesaControl";
import { Router } from "express";
import { autenticacaoToken } from "services/AutenticacaoToken";

const routes = Router();
const tipoDespesaControl = new TipoDespesaControl();
const despesaControl = new DespesaControl()

// Rota para cadastrar uma Despesa

// Rota para listar todas as Despesas

// Rota para alterar uma Despesa

// Rota para excluir uma Despesa


// Rota para cadastrar um Tipo de Despesa
routes.post('/cadastrar-tipo', tipoDespesaControl.create); 

// Rota para listar Tipos de Despesa
routes.get('/listar-todos-tipos', tipoDespesaControl.getAll);  

// Rota para alterar um Tipo de Despesa
routes.put('/alterar-tipo/:id', tipoDespesaControl.update);

// Rota para excluir um Tipo de Despesa
routes.delete('/excluir-tipo/:id', tipoDespesaControl.delete)



// Rota para listar todas as despesas
routes.get('/todas-despesas', despesaControl.getAll)  

// Rota para cadastrar despesa
routes.post('/cadastrar-despesa', despesaControl.create);

// Rota para alterar despesa]
routes.post('/alterar-despesa', despesaControl.alterar);

// Rota para excluir uma despesa
routes.delete('/excluir-despesa', despesaControl.deletar)

export default routes;