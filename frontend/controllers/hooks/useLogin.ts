'use client'

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components";
import { StatusInfoType } from "../types";
import { REQUEST_HEADERS } from "../utils";

/**
 * Hook customizado para encapsular a lógica de autenticação do cliente.
 * 
 * Intercepta os dados do formulário, gerencia o estado visual (loading, erro, sucesso) 
 * e executa a requisição HTTP para o endpoint de login. Em caso de sucesso, atualiza 
 * o contexto global do usuário e redireciona para a página principal (/).
 * 
 * @returns Uma tupla restrita contendo o objeto de status e a função de submissão.
 * 
 * @example
 * ```tsx
 * const [status, handleSubmmit] = useLogin();
 * 
 * return (
 *   <form action={handleSubmmit}>
 *     <StatusInfo status={status} />
 *     {/* ...inputs *\/}
 *   </form>
 * );
 * ```
 */

export function useLogin() {
    const router = useRouter();
    const { setUser } = useAuth();
    const [status, setStatus] = useState<StatusInfoType>({ type: 'idle' });

    const handleSubmit = useCallback(async (evt: React.SubmitEvent) => {
        evt.preventDefault();
        
        setStatus({ type: 'loading', message: "Logando..." });

        try {
            const data = new FormData(evt.target);
            const email = data.get('email') as string;
            const password = data.get('password') as string;

            const response = await fetch("/api/login", {
                method: 'POST',
                headers: REQUEST_HEADERS,
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (result.error) {
                setStatus({ type: 'error', message: result.error });
                return;
            }

            if (result.user) {
                setUser(result.user);
                evt.target.reset();
                setStatus({type: 'idle'});
                router.replace("/");
            }
        } catch {
            setStatus({ type: 'error', message: "Não foi possível efetuar login." });
        }

    }, [router, setUser]);

    return [status, handleSubmit] as const;
}