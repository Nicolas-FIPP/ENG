import { Router } from 'express';

const routes = Router();

// Criar pessoa interessada
routes.post('/');

// Buscar todas as pessoas interessadas
routes.get('/');

// Buscar pessoa interessada por email
routes.get('/');

// Deletar pessoa interessada por email
routes.delete('/');

export default routes;
