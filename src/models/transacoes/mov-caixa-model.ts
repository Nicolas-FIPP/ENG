import { PrismaClient } from '@prisma/client';

export class MovimentoCaixaModel {
  create = async (valor: number, status: boolean, prisma: PrismaClient): Promise<boolean> => {
    try {
      let prismaResponse = await prisma.movimentacaoCaixa.create({
        data: {
          valor: valor,
          status: status,
        },
      });
      return prismaResponse ? true : false;
    } catch (e) {
      return false;
    }
  };
}
