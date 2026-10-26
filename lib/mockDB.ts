import { User } from "@/models";

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