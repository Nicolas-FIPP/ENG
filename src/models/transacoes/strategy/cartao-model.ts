import { Strategy, TransacaoBodyRequest } from 'dtos/transacao/transacao';
import DinheiroModel from './dinheiro-model';
import { strategy } from './strategy';

const dinheiroModel = new DinheiroModel();

export default class CartaoModel implements strategy {
  public receber(transacao: TransacaoBodyRequest) {
    if (transacao.tipo == Strategy.cartao) {
      return transacao.valor;
    }
    return dinheiroModel.receber(transacao);
  }
}
