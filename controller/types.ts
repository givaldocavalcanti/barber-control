export interface User{
    email: string,
    nome?: string,
    type: 'cliente' | 'barbeiro' | 'admin'
}