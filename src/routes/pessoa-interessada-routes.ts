import { Router } from 'express';
import PessoaInteressadaControl from "../controllers/pessoa-interessada-control";


const pessoaInteressadaControl = new PessoaInteressadaControl();

const routes = Router();

// Criar pessoa interessada
routes.post('/',pessoaInteressadaControl.create);

// Buscar todas as pessoas interessadas
routes.get('/');

// Buscar pessoa interessada por email
routes.get('/');

// Deletar pessoa interessada por email
routes.delete('/');

export default routes;
