'use client'
import { useState } from "react";
import { useAuth } from "@/controllers";
import { PageContent, PageHeader, PageTab, PageTablist } from "../components";

export function ClienteDashboard() {
    const { user } = useAuth();
    const [currentTab, setCurrentTab] = useState<'agendamentos' | 'perfil'>('agendamentos');

    return (
        <>
            <PageHeader
                user={user!}
                headerText="Sua Agenda e Perfil"
            >
                <PageTablist className="w-full ">
                    <div className="w-full flex flex-row justify-center gap-2 md:gap-6">
                        <PageTab
                            className="flex-1 max-w-xs"
                            isActive={currentTab === 'agendamentos'}
                            onClick={() => setCurrentTab('agendamentos')}
                            aria-selected={currentTab === 'agendamentos'}
                            aria-controls="panel-agendamentos"
                        >
                            Agendamentos
                        </PageTab>
                        <PageTab
                            className="flex-1 max-w-xs"
                            isActive={currentTab === 'perfil'}
                            onClick={() => setCurrentTab('perfil')}
                            aria-selected={currentTab === 'perfil'}
                            aria-controls="panel-perfil"
                        >
                            Perfil
                        </PageTab>
                    </div>
                </PageTablist>
            </PageHeader>

            <PageContent className="p-6 md:p-12">
                {currentTab === 'agendamentos' ? (
                    <section aria-labelledby="agendamentos-heading">
                        <h2 id="agendamentos-heading" className="text-xl font-semibold">
                            Seus agendamentos
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Você ainda não possui agendamentos. A marcação de consultas será disponibilizada nesta área.
                        </p>
                    </section>
                ) : (
                    <section aria-labelledby="perfil-heading">
                        <h2 id="perfil-heading" className="text-xl font-semibold">
                            Seu perfil
                        </h2>
                        <dl className="mt-4 space-y-2 text-sm">
                            <div>
                                <dt className="font-semibold">Nome</dt>
                                <dd>{user?.nome}</dd>
                            </div>
                            <div>
                                <dt className="font-semibold">E-mail</dt>
                                <dd>{user?.email}</dd>
                            </div>
                        </dl>
                    </section>
                )}
            </PageContent>
        </>
    );
}