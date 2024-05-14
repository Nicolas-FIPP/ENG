import { PrismaClient } from '@prisma/client';
import { UserIn } from 'dtos/UsersDTO';

const prisma = new PrismaClient();

export default class UserModel {

  create = async (user: UserIn) => {
    return await prisma.pessoa.create({
      data : user
    });
  }

  getAll = async () => {
    return await prisma.pessoa.findMany();
  }

  get = async (pes_id: number) => {
    return await prisma.pessoa.findUnique({
      where: {
        pes_id
      }
    });
  }

  delete = async (pes_id: number) => {
    return await prisma.pessoa.delete({
      where: {
        pes_id
      }
    })
  }

  update = async (pes_id: number, user: UserIn) => {
    return await prisma.pessoa.update({
      where: {
        pes_id
      },
      data: {
        ...user
      }
    })
  }
};