import { EventoOut } from 'dtos/EventoDTO';
import { PessoaInteressadaDados } from './pessoa-interessada';

export interface CreateEventoResponseDto {
  evento: EventoOut;
  emailEnviado: PessoaInteressadaDados[];
}
