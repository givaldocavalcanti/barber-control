'use client'

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusInfoType } from "@/view";
import { REQUEST_HEADERS } from "../utils";

export function useRegisterClient() {
    const router = useRouter();
    const [status, setStatus] = useState<StatusInfoType>({ type: 'idle' });

    const handleSubmit = useCallback(async (evt: React.SubmitEvent) => {
        evt.preventDefault();

        setStatus({ type: 'loading', message: "O conselho está deliberando..." });

        try {
            const data = new FormData(evt.target);
            const nome = data.get("nome") as string;
            const email = data.get('email') as string;
            const telefone = data.get("telefone") as string;
            const password = data.get('password') as string;
            const confirmPassword = data.get("confirmPassword") as string;

            if (confirmPassword !== password) {
                setStatus({ type: "error", message: "As senhas divergem." });
                return;
            }

            const response = await fetch("/api/cadastro", {
                method: 'POST',
                headers: REQUEST_HEADERS,
                body: JSON.stringify({ email, password, nome, telefone, type: 'client' })
            });

            const result = await response.json();

            if (result.error) {
                setStatus({ type: 'error', message: result.error });
                return;
            }

            setStatus({
                type: 'success', 
                message: "Parabéns por entrar para o bando, já vamos direcionar para o login."})

            setTimeout(() => router.replace("/login"), 1500);
            

        } catch {
            setStatus({ 
                type: 'error', 
                message: "O conselho está ocupado no momento. Tente novamente mais tarde." 
            });
        }

    }, [router]);

    return [status, handleSubmit] as const;

}