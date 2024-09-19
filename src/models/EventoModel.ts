import { PrismaClient } from '@prisma/client';
import { EventoIn, EventoOut } from 'dtos/EventoDTO';
import { PessoaInteressada, PessoaInteressadaDados } from 'dtos/pessoa-interessada/pessoa-interessada';
import { PessoaInteressadaBodyRequest } from 'dtos/pessoa-interessada/request';
import { CreateEventoResponseDto } from 'dtos/pessoa-interessada/response';
import { Observador, Sujeito } from './observador';
import PessoaInteressadaModel from './pessoa-interessada-model';

const prisma = new PrismaClient();

export default class EventoModel implements Sujeito {
  private observadores: Observador[] = [];

  public add = async (pessoaInteressada: PessoaInteressadaBodyRequest): Promise<PessoaInteressada> => {
    const response: PessoaInteressada = await prisma.pessoaInteressada.create({
      data: pessoaInteressada,
    });
    return response;
  };

  public remove = async (email: string): Promise<PessoaInteressada> => {
    const response: PessoaInteressada = await prisma.pessoaInteressada.delete({
      where: {
        email: email,
      },
    });
    return response;
  };

  public notificar = async (): Promise<PessoaInteressadaDados[]> => {
    const prismaReponse: PessoaInteressada[] = await prisma.pessoaInteressada.findMany();

    /* const prismaResponseData: PessoaInteressadaModel[] = prismaReponse.map((pessoaInteressada) =>({
      nome: pessoaInteressada.nome,
      email: pessoaInteressada.email,
      enviarEmail(): 
    }
    ))

    const response: PessoaInteressadaDados[] = prismaResponseData.map((pessoaInteressada) =>
      pessoaInteressada.enviarEmail(),
    ); */

    const prismaResponseData: PessoaInteressadaModel[] = prismaReponse.map(
      (pessoa) => new PessoaInteressadaModel(pessoa),
    );

    // Envia e retorna os dados formatados
    const response: PessoaInteressadaDados[] = prismaResponseData.map((pessoaModel) => pessoaModel.enviarEmail());

    return response;
  };

  public criarEvento = async (evento: EventoIn): Promise<CreateEventoResponseDto> => {
    const prismaResponse: EventoOut = await prisma.evento.create({
      data: evento,
    });

    const notificarResponse = await this.notificar();

    const response: CreateEventoResponseDto = {
      evento: prismaResponse,
      emailEnviado: notificarResponse,
    };

    return response;
  };

  public validaDatas = (DataIni: Date, DataFim: Date) => {
    if (DataIni != null && DataIni != null && DataIni != undefined && DataIni != undefined) {
      if (DataFim > DataIni) return true;
      else return false;
    } else return false;
  };

  public getAll = async () => {
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

  public get = async (id: number) => {
    return await prisma.evento.findUnique({
      where: {
        id,
      },
    });
  };

  public delete = async (id: number) => {
    return await prisma.evento.delete({
      where: {
        id,
      },
    });
  };

  public update = async (id: number, evento: EventoIn) => {
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
