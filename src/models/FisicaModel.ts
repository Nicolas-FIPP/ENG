import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export default class FisicaModel {
  getById = async (id: number) => {
      return await prisma.fisica.findUnique({
        where: {
          pes_id: id
        }
      });
  }

  getByCpf = async(cpf: string) => {
    return await prisma.fisica.findUnique({
      where: {
        cpf: cpf
      }
    })
  }


    
}