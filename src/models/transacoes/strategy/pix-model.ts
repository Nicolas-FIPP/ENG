import { Strategy, TransacaoBodyRequest } from 'dtos/transacao/transacao';
import CartaoModel from './cartao-model';
import { strategy } from './strategy';

const cartaoModel = new CartaoModel();

export default class PixModel implements strategy {
  public receber(transacao: TransacaoBodyRequest): number {
    if (transacao.tipo == Strategy.pix) {
      return transacao.valor * 0.95;
    }
    return cartaoModel.receber(transacao);
  }
}
