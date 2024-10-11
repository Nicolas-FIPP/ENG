export interface TransacaoBodyRequest {
  valor: number;
  tipo?: Strategy;
}

export enum Strategy {
  pix = 1,
  cartao = 2,
  dinheiro = 3,
}
