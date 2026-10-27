export interface User{
    email: string;  //ID do usuário
    password?: string;
    telefone?: string;
    dataNascimento?: string;
    nome?: string;
    type: 'cliente' | 'barbeiro' | 'admin';
}

export type StatusAgendamento = 'Aguardando' | 'Confirmado' | 'Concluido' | 'Cancelado';

export interface Servico {
    id: string;
    nome: string;
    tempoEstimado: number;      // Tempo em minutos
    valor: number;
}

export interface Agendamento {
    id: string;
    dia: string;                // "MM-DD-YYYY"
    horario: string;            // "HH:mm"
    barbeiro: string;           // email do barbeiro
    cliente: string;            // e-mail do cliente
    servicos: string[];         // ids dos servicos
    status: StatusAgendamento;
}