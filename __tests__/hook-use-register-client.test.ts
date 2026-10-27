import { renderHook, act } from "@testing-library/react";
import { useRegisterClient } from "@/controllers/hooks/useRegisterClient";

// mock para o replace do useRouter
const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: mockReplace
    })
}));

// mock do fetch
global.fetch = jest.fn();

describe('Hook useRegisterClient', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers(); // para enganar os timers
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('deve retornar erro se as senhas divergirem', async () => {
        //current ==> 0-status, 1-handleSubmit
        const { result } = renderHook(() => useRegisterClient());

        const fakeForm = document.createElement("form");
        fakeForm.innerHTML = `
        <input name="nome" value="Teste" />
        <input name="email" value="teste@teste.com" />
        <input name="telefone" value="00 00000-0000" />
        <input name="dataNascimento" value="01/01/2000" />
        <input name="password" value="123456" />
        <input name="confirmPassword" value="1234567" />
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
            message: "As senhas divergem."
        });

        expect(global.fetch).not.toHaveBeenCalled();
    });

    it('deve exibir mensagem de erro se a API recusar o cadastro', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => ({ error: 'Já existe um parceiro com este e-mail.' })
        });

        const { result } = renderHook(() => useRegisterClient());

        const fakeForm = document.createElement('form');
        fakeForm.innerHTML = `
        <input name="nome" value="Teste" />
        <input name="email" value="teste@teste.com" />
        <input name="telefone" value="00 00000-0000" />
        <input name="dataNascimento" value="01/01/2000" />
        <input name="password" value="123456" />
        <input name="confirmPassword" value="123456" />
    `;

        const mockEvent = {
            preventDefault: jest.fn(),
            target: fakeForm
        } as unknown as React.SubmitEvent;

        await act(async () => {
            await result.current[1](mockEvent);
        });

        expect(result.current[0]).toEqual({
            type: 'error',
            message: 'Já existe um parceiro com este e-mail.'
        });

        expect(mockReplace).not.toHaveBeenCalled();
    });

    it('deve exibir mensagem de erro se o servidor cair ou a rede falhar', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

        const { result } = renderHook(() => useRegisterClient());

        const fakeForm = document.createElement('form');
        fakeForm.innerHTML = `
            <input name="nome" value="Teste" />
            <input name="email" value="teste@teste.com" />
            <input name="telefone" value="00 00000-0000" />
            <input name="dataNascimento" value="01/01/2000" />
            <input name="password" value="123456" />
            <input name="confirmPassword" value="123456" />
        `;

        const mockEvent = {
            preventDefault: jest.fn(),
            target: fakeForm
        } as unknown as React.SubmitEvent;

        await act(async () => {
            await result.current[1](mockEvent);
        });

        expect(result.current[0]).toEqual({
            type: 'error',
            message: "O conselho está ocupado no momento. Tente novamente mais tarde."
        });

        expect(mockReplace).not.toHaveBeenCalled();
    });

    it('deve realizar o cadastro e redirecionar após 1,5s', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: async () => ({ success: true })
        });

        //current ==> 0-status, 1-handleSubmit
        const { result } = renderHook(() => useRegisterClient());

        const fakeForm = document.createElement('form');
        fakeForm.innerHTML = `
        <input name="nome" value="Teste" />
        <input name="email" value="teste@teste.com" />
        <input name="telefone" value="00 00000-0000" />
        <input name="dataNascimento" value="01/01/2000" />
        <input name="password" value="123456" />
        <input name="confirmPassword" value="123456" />
    `;

        fakeForm.reset = jest.fn();

        const mockEvent = {
            preventDefault: jest.fn(),
            target: fakeForm
        } as unknown as React.SubmitEvent;

        await act(async () => {
            await result.current[1](mockEvent);
        });

        expect(result.current[0]).toEqual({
            type: 'success',
            message: 'Parabéns por entrar para o bando, já vamos te direcionar para o login.'
        });

        act(() => {
            jest.advanceTimersByTime(1500);
        });

        expect(fakeForm.reset).toHaveBeenCalled();
        expect(result.current[0].type).toBe('idle');
        expect(mockReplace).toHaveBeenCalledWith('/login');
    });
})




