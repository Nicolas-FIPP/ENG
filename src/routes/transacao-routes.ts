import { MovCaixaControl } from 'controllers/template-method/mov-caixa-control';
import { PagamentoControl } from 'controllers/template-method/pagamento-control';
import { RecebimentoControl } from 'controllers/template-method/recebimento-control';
import { Router } from 'express';

const routes = Router();
const pagamentoControl = new PagamentoControl();
const recebimentoControl = new RecebimentoControl();
const movCaixa = new MovCaixaControl();

routes.post('/pagar', pagamentoControl.quitar.bind(pagamentoControl));
routes.get('/pagar', pagamentoControl.getAll);

routes.post('/receber', recebimentoControl.quitar.bind(recebimentoControl));
routes.get('/receber', recebimentoControl.getAll);

routes.get('/mov-caixa', movCaixa.getAll);

export default routes;
