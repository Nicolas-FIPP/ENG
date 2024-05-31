export interface Agendain{
    name:string;
    cpf:string;
    data:Date;
    delivery:string;
    uf?:string;
    cidade?:string;
    rua?:string;
    bairro?:string;
    complemento?:string;
    cep?:string;
    numero?:string;
}

export interface Agendaout{
    id:number;
    name:string;
    cpf:string;
    data:Date;
    delivery:string;
    uf?:string;
    cidade?:string;
    rua?:string;
    bairro?:string;
    complemento?:string;
    cep?:string;
    numero?:string;
}