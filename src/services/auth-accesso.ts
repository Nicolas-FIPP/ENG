import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';

function autenticacaoAcesso(req: Request, res: Response, next: NextFunction) {
  if (req.body.nivel !== 1) {
    return res.status(HttpStatusCode.Unauthorized).send({ message: 'Não autorizado.' });
  }
  next();
}
