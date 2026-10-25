export interface User{
    email: string;
    password: string;
    telefone?: string;
    nome?: string;
    type: 'cliente' | 'barbeiro' | 'admin';
}