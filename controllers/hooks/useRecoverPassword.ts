'use client'
import { useCallback, useState } from "react";
import { StatusInfoType } from "../types";
import { useRouter } from "next/navigation";

export function useRecoverPassword(){
    const router = useRouter();
    const [status, setStatus] = useState<StatusInfoType>({ type: 'idle' });

    const handleSubmit = useCallback(async (evt: React.SubmitEvent) => {
        
        evt.preventDefault();
        
        setStatus({type: 'loading', message: "Enviando e-mail de recuperação..."});
        
        //COISAS QUE FAZEM RECUPERAR O E-MAIL
        
        setStatus({type: 'success', message: "E-mail de recuperação enviado!"});

        setTimeout(() => {
            evt.target.reset();
            setStatus({type: 'idle'});
            router.replace("/login");
        }, 1500);
    }, [router]);

    return [status, handleSubmit] as const;
}