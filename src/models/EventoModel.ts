import { PrismaClient } from '@prisma/client';
import { EventoIn } from 'dtos/EventoDTO';
import { Observador, Sujeito } from './observador';

const prisma = new PrismaClient();

export default class EventoModel implements Sujeito {
  private observadores: Observador[] = [];

  add = (observador: Observador): void => {
    this.observadores.push(observador);
  };

  remove = (observador: Observador) => {
    this.observadores = this.observadores.filter((obs) => obs !== observador);
  };

  notificar = (observador: Observador) => {
    observador.enviarEmail(this.observadores);
  };




  

  

  validaDatas = (DataIni: Date, DataFim: Date) => {
    if (DataIni != null && DataIni != null && DataIni != undefined && DataIni != undefined) {
      if (DataFim > DataIni) return true;
      else return false;
    } else return false;
  };

  create = async (evento: EventoIn) => {
    return await prisma.evento.create({
      data: evento,
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
  };

  get = async (id: number) => {
    return await prisma.evento.findUnique({
      where: {
        id,
      },
    });
  };

  delete = async (id: number) => {
    return await prisma.evento.delete({
      where: {
        id,
      },
    });
  };

  update = async (id: number, evento: EventoIn) => {
    return await prisma.evento.update({
      where: {
        id,
      },
      data: {
        ...evento,
      },
    });
  };
}
