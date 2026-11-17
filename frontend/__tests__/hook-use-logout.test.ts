import { renderHook, act } from "@testing-library/react";
import { useLogout } from "@/controllers/hooks/useLogout";
import { useAuth } from "@/controllers/components/AuthProvider";

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({ replace: mockReplace })
}));

jest.mock('../controllers/components/AuthProvider', () => ({
    useAuth: jest.fn()
}));

global.fetch = jest.fn();

describe('Hook useLogout', () => {
    const mockSetUser = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({ setUser: mockSetUser });
    });

    it('encerra a sessão na API, limpa o usuário e volta para o login', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

        const { result } = renderHook(() => useLogout());

        await act(async () => {
            await result.current();
        });

        expect(global.fetch).toHaveBeenCalledWith("/api/logout", { method: "POST" });
        expect(mockSetUser).toHaveBeenCalledWith(null);
        expect(mockReplace).toHaveBeenCalledWith("/login");
    });

    it('volta para o login mesmo se a API falhar', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("offline"));

        const { result } = renderHook(() => useLogout());

        await act(async () => {
            await result.current();
        });

        expect(mockSetUser).toHaveBeenCalledWith(null);
        expect(mockReplace).toHaveBeenCalledWith("/login");
    });
});
