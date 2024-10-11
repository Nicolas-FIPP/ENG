import { PagamentoControl } from 'controllers/template-method/pagamento-control';
import { RecebimentoControl } from 'controllers/template-method/recebimento-control';
import { Router } from 'express';

const routes = Router();
const pagamentoControl = new PagamentoControl();
const recebimentoControl = new RecebimentoControl();

routes.post('/pagar', pagamentoControl.quitar.bind(pagamentoControl));
routes.post('/receber', recebimentoControl.quitar.bind(recebimentoControl));

export default routes;
