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

            <PageContent>

            </PageContent>
        </>
    );
}