import { renderHook, act } from "@testing-library/react";
import { useLogin } from "@/controllers/hooks/useLogin";
import { useAuth } from "@/controllers/components/AuthProvider";

// 1. Mock do Next.js Router
const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({ replace: mockReplace })
}));

// 2. Container Mock do Contexto global (useAuth)
jest.mock('../controllers/components/AuthProvider', () => ({
    useAuth: jest.fn()
}));

global.fetch = jest.fn();

describe('Hook useLogin', () => {
    const mockSetUser = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            setUser: mockSetUser
        });
    });

    it('deve retornar erro se a API recusar as credenciais', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => ({ error: 'Senha inválida.', user: null })
        });

        const { result } = renderHook(() => useLogin());

        const fakeForm = document.createElement("form");
        fakeForm.innerHTML = `
            <input name="email" value="teste@teste.com" />
            <input name="password" value="senhaerrada" />
        `;

        const fakeEvent = {
            preventDefault: jest.fn(),
            target: fakeForm
        } as unknown as React.SubmitEvent;

        await act(async () => {
            await result.current[1](fakeEvent);
        });

        expect(result.current[0]).toEqual({
            type: 'error',
            message: 'Senha inválida.'
        });
        
        expect(mockSetUser).not.toHaveBeenCalled();
        expect(mockReplace).not.toHaveBeenCalled();
    });

    it('deve efetuar login com sucesso, atualizar o usuário e redirecionar', async () => {
        const mockUser = { id: '123', nome: 'Teste', type: 'cliente' };
        
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => ({ user: mockUser })
        });

        const { result } = renderHook(() => useLogin());

        const fakeForm = document.createElement("form");
        fakeForm.innerHTML = `
            <input name="email" value="teste@teste.com" />
            <input name="password" value="123456" />
        `;

        fakeForm.reset = jest.fn();

        const fakeEvent = {
            preventDefault: jest.fn(),
            target: fakeForm
        } as unknown as React.SubmitEvent;

        await act(async () => {
            await result.current[1](fakeEvent);
        });

        // 1. Verifica se o usuário foi salvo no estado global (useAuth)
        expect(mockSetUser).toHaveBeenCalledWith(mockUser);
        // 2. Verifica se o formulário foi limpo
        expect(fakeForm.reset).toHaveBeenCalled();
        // 3. Verifica se o status voltou para idle
        expect(result.current[0].type).toBe('idle');
        // 4. Verifica se redirecionou para a raiz "/"
        expect(mockReplace).toHaveBeenCalledWith('/');
    });

    it('deve exibir mensagem de fallback se o servidor ou a rede caírem', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Falha de conexão com a internet'));

        const { result } = renderHook(() => useLogin());

        const fakeForm = document.createElement("form");
        fakeForm.innerHTML = `
            <input name="email" value="teste@teste.com" />
            <input name="password" value="123456" />
        `;

        const fakeEvent = {
            preventDefault: jest.fn(),
            target: fakeForm
        } as unknown as React.SubmitEvent;

        await act(async () => {
            await result.current[1](fakeEvent);
        });

        // Verifica se a mensagem hardcoded do bloco catch foi acionada
        expect(result.current[0]).toEqual({
            type: 'error',
            message: 'Não foi possível efetuar login.'
        });
        expect(mockSetUser).not.toHaveBeenCalled();
        expect(mockReplace).not.toHaveBeenCalled();
    });
});