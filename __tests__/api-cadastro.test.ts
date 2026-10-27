/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/cadastro/route';
import { usuariosDB } from '@/lib/mockDB'; 
import { User } from '@/models';

describe('API Route /api/cadastro', () => {
    beforeEach(() => {
        usuariosDB.clear();
    });

    it('deve realizar o cadastro com sucesso, salvar no banco e retornar status 201', async () => {
        const newUser: User = {
            email: 'teste@teste.com',
            password: '123',
            nome: 'Teste',
            telefone: '38 99999-9999',
            dataNascimento: '12-31-2000',
            type: 'cliente'
        };

        const mockRequest = new NextRequest('http://localhost/api/cadastro-cliente', {
            method: 'POST',
            body: JSON.stringify(newUser)
        });

        const response = await POST(mockRequest);
        const data = await response.json();

        // 1. Verifica se a API retornou o status correto e a mensagem de sucesso
        expect(response.status).toBe(201);
        expect(data.message).toBe('Parabéns por entrar para o bando.');

        // 2. Verifica se o usuário foi realmente salvo
        const savedUser = usuariosDB.get('teste@teste.com');
        expect(savedUser).toBeDefined();
        expect(savedUser).toEqual(newUser)
    });

    it('deve retornar erro 409 se tentar cadastrar um e-mail já existente com o mesmo type', async () => {
        // Força a existência de um usuário no banco antes de fazer a requisição
        usuariosDB.set('duplicado@teste.com', {
            email: 'duplicado@teste.com',
            password: 'abc',
            nome: 'Usuário Antigo',
            telefone: '000',
            dataNascimento: '12-31-2000',
            type: 'cliente'
        });

        // Tenta cadastrar alguém com o mesmo e-mail e type
        const duplicateUser: User = {
            email: 'duplicado@teste.com',
            password: '123',
            nome: 'Duplicado',
            telefone: '111',
            dataNascimento: '12-31-2000',
            type: 'cliente'
        };

        const mockRequest = new NextRequest('http://localhost/api/cadastro-cliente', {
            method: 'POST',
            body: JSON.stringify(duplicateUser)
        });

        const response = await POST(mockRequest);
        const data = await response.json();

        // Verifica se a API barrou a operação
        expect(response.status).toBe(409);
        expect(data.error).toBe('Já existe um parceiro com este e-mail.');
        
        // Garante que os dados do usuário antigo não foram sobrescritos
        const currentDBUser = usuariosDB.get('duplicado@teste.com');
        expect(currentDBUser?.nome).toBe('Usuário Antigo');
    });
});