/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/login/route';
import { usuariosDB } from '@/lib/mockDB'; 
import { User } from '@/models/types';

describe('API Route /api/login', () => {
    beforeEach(() => {
        usuariosDB.clear();
    });

    it('deve retornar erro 403 se o usuário não for encontrado', async () => {
        const mockRequest = new NextRequest('http://localhost/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: 'inexistente@teste.com', password: '123' })
        });

        const response = await POST(mockRequest);
        const data = await response.json();

        expect(response.status).toBe(403);
        expect(data).toEqual({
            error: 'Usuário não encontrado.',
            user: null
        });
    });

    it('deve retornar erro 403 se a senha for inválida', async () => {
        usuariosDB.set('teste@teste.com', {
            nome: 'Teste', email: 'teste@teste.com', password: 'senha-correta', type: 'cliente'
        });

        const mockRequest = new NextRequest('http://localhost/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: 'teste@teste.com', password: 'senha-errada' })
        });

        const response = await POST(mockRequest);
        const data = await response.json();

        expect(response.status).toBe(403);
        expect(data).toEqual({
            error: 'Senha inválida.',
            user: null
        });
    });

    it('deve realizar login, retornar o usuário sem a senha e criar o cookie HTTPOnly', async () => {
        const mockUser: User = {
           nome: 'Teste', email: 'teste@teste.com', password: '123', type: 'cliente'
        };
       
        usuariosDB.set('teste@teste.com', mockUser);

        const mockRequest = new NextRequest('http://localhost/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: 'teste@teste.com', password: '123' })
        });

        const response = await POST(mockRequest);
        const data = await response.json();

        expect(response.status).toBe(200);

        const expectedUser = { ...mockUser };
        delete expectedUser.password;

        expect(data).toEqual({
            user: expectedUser
        });

        const setCookieHeader = response.headers.get('Set-Cookie');
        
        expect(setCookieHeader).toBeDefined();
        expect(setCookieHeader).toContain('barber-session=');
        expect(setCookieHeader).toContain('HttpOnly');
        expect(setCookieHeader).toContain('Max-Age=86400');
    });
});