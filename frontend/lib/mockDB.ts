import { User, Servico, Agendamento } from "@/models";

export const usuariosDB = new Map<string, User>();

usuariosDB.set('breno@barber.com', {
    nome: 'Breno Oliveira',
    email: 'breno@barber.com',
    telefone: "(00) 00000-0000",
    password: '123',
    type: 'admin'
});

usuariosDB.set("jhonatan@user.com", {
    nome: "Jhonatan Moreira",
    email: "jhonatan@user.com",
    telefone: "(11) 11111-1111",
    password: '123456',
    dataNascimento: '01/18/2000',
    type: 'cliente'
});

usuariosDB.set("bruno@user.com", {
    nome: "Bruno Oliveira",
    email: "bruno@user.com",
    telefone: "(11) 11111-1111",
    password: '123456',
    dataNascimento: '01/18/2000',
    type: 'cliente'
});

usuariosDB.set("julio@barber.com", {
    nome: 'Julio Barbosa',
    email: "julio@barber.com",
    telefone: "(22) 22222-2222",
    password: '123456',
    type: 'barbeiro'
});

usuariosDB.set("richard@barber.com", {
    nome: 'Richard Hausseman',
    email: "richard@barber.com",
    telefone: "(22) 22222-2222",
    password: '123456',
    type: 'barbeiro'
});

//------------------------------------------------------------

export const servicosDB = new Map<string, Servico>();

servicosDB.set('prod_1', { 
    id: 'prod_1', 
    nome: 'Corte Alpha', 
    tempoEstimado: 30, 
    valor: 45.00 
});

servicosDB.set('prod_2', { 
    id: 'prod_2', 
    nome: 'Barba Terapia', 
    tempoEstimado: 30, 
    valor: 35.00 
});

servicosDB.set('prod_3', { 
    id: 'prod_3', 
    nome: 'Combo Matilha (Corte + Barba)', 
    tempoEstimado: 60, 
    valor: 75.00 
});

servicosDB.set('prod_4', { 
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
    barbeiro: "julio@barber.com",
    cliente: "jhonatan@user.com",
    servicos: ['prod_3'],
    status: 'Confirmado'
});

agendamentosDB.set('agen_2', {
    id: 'agen_2',
    dia: '10-26-2026',
    horario: '16:30',
    barbeiro: "julio@barber.com",
    cliente: "bruno@user.com",
    servicos: ['prod_1'],
    status: 'Aguardando'
});

agendamentosDB.set('agen_3', {
    id: 'agen_3',
    dia: '11-02-2026',
    horario: '18:00',
    barbeiro: "richard@barber.com",
    cliente: "jhonatan@user.com",
    servicos: ['prod_4'],
    status: 'Confirmado'
});

agendamentosDB.set('agen_4', {
    id: 'agen_4',
    dia: '11-02-2026',
    horario: '14:00',
    barbeiro: "richard@barber.com",
    cliente: "bruno@user.com",
    servicos: ['prod_3', 'prod_4'],
    status: 'Confirmado'
});