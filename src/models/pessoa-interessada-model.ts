import { PrismaClient } from '@prisma/client';
import { PessoaInteressada } from 'dtos/pessoa-interessada/pessoa-interessada';
import { Observador } from 'models/observador';

const prisma = new PrismaClient();

export default class PessoaInteressadaModel implements Observador {
  enviarEmail = (observadores: Observador[]): void => {
    // recebe a lista e manda email
  };

  create = async (pessoaInteressada: PessoaInteressada) => {
    return await prisma.pessoaInteressada.create({
      data: pessoaInteressada,
    });
  };

  getAll = async () => {};

  getByEmail = async () => {};

  deleteByEmail = async () => {};
}
