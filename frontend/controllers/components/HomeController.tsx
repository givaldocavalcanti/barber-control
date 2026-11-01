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
                <></>
            ) : user.type === 'admin' ? (
                <></>
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