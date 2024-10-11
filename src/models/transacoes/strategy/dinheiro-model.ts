import { TransacaoBodyRequest } from 'dtos/transacao/transacao';
import { strategy } from './strategy';

export default class DinheiroModel implements strategy {
  public receber(transacao: TransacaoBodyRequest) {
    return transacao.valor * 0.9;
  }
}
