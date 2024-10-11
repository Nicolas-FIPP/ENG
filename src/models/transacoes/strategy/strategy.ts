import { TransacaoBodyRequest } from 'dtos/transacao/transacao';

export interface strategy {
  receber(transacao: TransacaoBodyRequest): number;
}
