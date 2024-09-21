import { PessoaInteressada, PessoaInteressadaDados } from 'dtos/pessoa-interessada/pessoa-interessada';
import { Observador } from 'models/observador';

export default class PessoaInteressadaModel implements Observador {
  public nome: string;
  public email: string;
  public constructor(pessoaInteressada: PessoaInteressada) {
    (this.nome = pessoaInteressada.nome), (this.email = pessoaInteressada.email);
  }

  enviarEmail = (): PessoaInteressadaDados => {
    const response: PessoaInteressadaDados = {
      nome: this.nome,
      email: this.email,
    };
    return response;
  };
}
