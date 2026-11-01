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
    id: number;
    nome: string;
    tempoEstimado: number;      // Tempo em minutos
    valor: number;
}

export interface Agendamento {
    id: number;
    dia: string;                // "MM-DD-YYYY"
    horario: string;            // "HH:mm"
    barbeiroId: number;
    clienteId: number;
    servicos: number[];         // ids dos servicos
    status: StatusAgendamento;
}