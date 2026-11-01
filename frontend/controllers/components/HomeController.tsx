'use client'

import { ClienteDashboard } from "@/view/pages";
import { useAuth } from "./AuthProvider"
import { BarberLogo, LoadingSpinner, PageContainer } from "./utils";

export function HomeController() {
    const { user } = useAuth();

    if(!user){
        return (
            <PageContainer>
                <LoadingSpinner spinnerClassName="w-20 h-20"/>
            </PageContainer>
        );
    }

    return (
        <PageContainer className="text-slate-800">
            { user.type === 'cliente'  ? <ClienteDashboard />
            : user.type === 'barbeiro' ? (
                <RolePlaceholder
                    title="Painel do barbeiro"
                    message="A agenda e o gerenciamento de atendimentos ainda estão em desenvolvimento."
                />
            ) : user.type === 'admin' ? (
                <RolePlaceholder
                    title="Painel administrativo"
                    message="O gerenciamento de serviços, equipe e relatórios ainda está em desenvolvimento."
                />
            ) : (
                <div className="flex flex-col items-center gap-2">
                    <BarberLogo className="w-12 h-12" />
                    <p className="mb-4 font-semibold">Equipe BarberControl informa:</p>
                    <p>Este tipo de usuário não esta registrado.</p>
                    <p>Entre em contato com a Barbearia.</p>
                </div>
            )}
        </PageContainer>
    );
}

function RolePlaceholder({ title, message }: { title: string; message: string }) {
    return (
        <div className="flex max-w-lg flex-col items-center gap-3 text-center">
            <BarberLogo className="h-16 w-16 text-gold" />
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p>{message}</p>
        </div>
    );
}