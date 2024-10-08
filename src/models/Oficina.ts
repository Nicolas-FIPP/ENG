import { PrismaClient } from '@prisma/client';
import { OficinaIn } from 'dtos/OficinaDTO';
import { TipoOficinaIn } from 'dtos/TipoOficinaDTO';

const prisma = new PrismaClient();

export default class OficinaModel {

  create = async (oficina : OficinaIn) => {
    return await prisma.oficina.create({
      data : oficina
    });
  }

  getAll = async () => {
    return await prisma.oficina.findMany();
  }

  get = async (id: number) => {
    return await prisma.oficina.findUnique({
      where: {
        id
      }
    });
  }

  delete = async (id: number) => {
    return await prisma.oficina.delete({
      where: {
        id
      }
    })
  }

  update = async (id: number, oficina: OficinaIn) => {
    return await prisma.oficina.update({
      where: {
        id
      },
      data: {
        ...oficina
      }
    })
  }

  getListatodasOficinasComMatriculadosENomes = async () => {
    return await prisma.oficina.findMany({
      select: {
        id:true,
        disciplina: true, 
        matricula: {
          select: {
            id: true, 
            
            fisica: {
              select: {
                pessoa: {
                  select: {
                    nome: true, 
                  },
                },
              },
            },
          },
        },
      },
    });
  };

  deleteMatricula  = async (id: number) => {
    return await prisma.matricula.delete({
      where: {
        id
      }
    })
  }
  
  
  
};