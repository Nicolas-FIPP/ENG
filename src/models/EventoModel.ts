import { PrismaClient } from '@prisma/client';
import { create } from 'domain';
import { EventoIn } from 'dtos/EventoDTO';

const prisma = new PrismaClient();

export default class EventoModel {


  validaDatas = (DataIni : Date, DataFim : Date) => {
    console.log("ENTROU NA FUNÇÃO DE VALIDAR");
    console.log(DataIni + " " + DataFim);
    
    if (DataIni != null && DataIni != null && DataIni != undefined && DataIni != undefined)
    {
      if (DataFim > DataIni)
        return true;
      else
        return false;
    }
    else
      return false;
  };

  create = async (evento : EventoIn) => {
    return await prisma.evento.create({
      data : evento
    });
  };

  getAll = async () => {
    return await prisma.evento.findMany({
      include: {
        pessoa: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  get = async (id: number) => {
    return await prisma.evento.findUnique({
      where: {
        id
      }
    });
  }

  delete = async (id: number) => {
    return await prisma.evento.delete({
      where: {
        id
      }
    })
  }

  update = async (id: number, evento: EventoIn) => {
    return await prisma.evento.update({
      where: {
        id
      },
      data: {
        ...evento
      }
    })
  }
};