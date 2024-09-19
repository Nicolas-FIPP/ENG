import { EventoIn } from 'dtos/EventoDTO';
import { PessoaInteressada, PessoaInteressadaDados } from 'dtos/pessoa-interessada/pessoa-interessada';
import { PessoaInteressadaBodyRequest } from 'dtos/pessoa-interessada/request';
import { CreateEventoResponseDto } from 'dtos/pessoa-interessada/response';

export interface Observador {
  enviarEmail(observadores: Observador[]): void;
}

export interface Sujeito {
  add(reqData: PessoaInteressadaBodyRequest): Promise<PessoaInteressada>;
  remove(reqData: string): Promise<PessoaInteressada>;
  notificar(): Promise<PessoaInteressadaDados[]>;
  criarEvento(reqData: EventoIn): Promise<CreateEventoResponseDto>;
}
