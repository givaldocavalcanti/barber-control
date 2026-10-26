export interface User{
    email: string;
    password: string;
    telefone?: string;
    dataNascimento?: Date;
    nome?: string;
    type: 'cliente' | 'barbeiro' | 'admin';
}