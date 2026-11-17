import { fireEvent, render, screen } from "@testing-library/react";
import { Login } from "../view/pages/public/Login";

jest.mock('../controllers', () => ({
    useLogin: () => [{ type: 'idle' }, jest.fn()],
    BarberLogo: () => null,
}));

describe('Contas de demonstração na tela de login', () => {
    it('lista as contas de cliente, barbeiro e administrador', () => {
        render(<Login />);

        expect(screen.getByText('jhonatan@user.com')).toBeTruthy();
        expect(screen.getByText('julio@barber.com')).toBeTruthy();
        expect(screen.getByText('breno@barber.com')).toBeTruthy();
    });

    it('preenche e-mail e senha ao escolher uma conta', () => {
        render(<Login />);

        fireEvent.click(screen.getByRole('button', { name: /Entrar como barbeiro/i }));

        expect((screen.getByLabelText('E-mail:') as HTMLInputElement).value).toBe('julio@barber.com');
        expect((screen.getByLabelText('Senha:') as HTMLInputElement).value).toBe('123456');
    });
});
