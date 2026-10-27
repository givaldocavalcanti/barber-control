import { User, Produto, Agendamento } from "@/models";

export const usuariosDB = new Map<string, User>();

usuariosDB.set('admin@barber.com', {
    nome: 'Admin',
    email: 'admin@barber.com',
    telefone: "(00) 00000-0000",
    password: '123',
    type: 'admin'
});

usuariosDB.set("user@user.com", {
    nome: "Usuario",
    email: "user@user.com",
    telefone: "(11) 11111-1111",
    password: '123456',
    dataNascimento: new Date('01/18/2000'),
    type: 'cliente'
});

usuariosDB.set("barber@barber.com", {
    nome: 'Barbeiro',
    email: "barber@barber.com",
    telefone: "(22) 22222-2222",
    password: '123456',
    type: 'barbeiro'
});

//------------------------------------------------------------

export const produtosDB = new Map<string, Produto>();

produtosDB.set('prod_1', { 
    id: 'prod_1', 
    nome: 'Corte Alpha', 
    tempoEstimado: 30, 
    valor: 45.00 
});

produtosDB.set('prod_2', { 
    id: 'prod_2', 
    nome: 'Barba Terapia', 
    tempoEstimado: 30, 
    valor: 35.00 
});

produtosDB.set('prod_3', { 
    id: 'prod_3', 
    nome: 'Combo Matilha (Corte + Barba)', 
    tempoEstimado: 60, 
    valor: 75.00 
});

produtosDB.set('prod_4', { 
    id: 'prod_4', 
    nome: 'Platinado', 
    tempoEstimado: 120, 
    valor: 150.00 
});

//------------------------------------------------------------

export const agendamentosDB = new Map<string, Agendamento>();

agendamentosDB.set('agen_1', {
    id: 'agen_1',
    dia: '10-28-2026',
    horario: '14:00',
    barbeiro: "barber@barber.com",
    cliente: "user@user.com",
    produtos: ['prod_3'],
    status: 'Confirmado'
});

agendamentosDB.set('agen_2', {
    id: 'agen_2',
    dia: '10-26-2026',
    horario: '16:30',
    barbeiro: "barber@barber.com",
    cliente: "user@user.com",
    produtos: ['prod_1'],
    status: 'Aguardando'
});

agendamentosDB.set('agen_3', {
    id: 'agen_3',
    dia: '11-02-2026',
    horario: '18:00',
    barbeiro: "barber@barber.com",
    cliente: "user@user.com",
    produtos: ['prod_4'],
    status: 'Confirmado'
});

agendamentosDB.set('agen_4', {
    id: 'agen_4',
    dia: '11-02-2026',
    horario: '14:00',
    barbeiro: "barber@barber.com",
    cliente: "user@user.com",
    produtos: ['prod_3', 'prod_4'],
    status: 'Confirmado'
});