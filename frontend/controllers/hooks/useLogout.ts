'use client'

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components";

/**
 * Hook para encerrar a sessão do usuário.
 *
 * Chama o endpoint de logout (que apaga o cookie de sessão), limpa o usuário
 * do contexto global e volta para a tela de login. Mesmo se a API falhar,
 * o usuário é levado ao login.
 *
 * @returns Função assíncrona que executa o logout.
 *
 * @example
 * ```tsx
 * const logout = useLogout();
 * <button onClick={logout}>Sair</button>
 * ```
 */

export function useLogout() {
    const router = useRouter();
    const { setUser } = useAuth();

    return useCallback(async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
        } catch {
            // Segue para o login mesmo sem resposta da API.
        }

        setUser(null);
        router.replace("/login");
    }, [router, setUser]);
}
