export interface Observador {
  enviarEmail(observadores: Observador[]): void;
}

export interface Sujeito {
  add(observador: Observador): void;
  remove(observador: Observador): void;
  notificar(observador: Observador): void;
}
