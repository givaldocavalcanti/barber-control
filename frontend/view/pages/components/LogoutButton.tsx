'use client'

import { LogOut } from "lucide-react";
import { useLogout } from "@/controllers";

/**
 * Botão fixo no canto inferior direito que encerra a sessão.
 *
 * Aparece em todos os painéis (cliente, barbeiro e administrador).
 */

export function LogoutButton() {
    const logout = useLogout();

    return (
        <button
            type="button"
            onClick={logout}
            className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-md bg-charcoal text-cream border border-gold/40 shadow-md hover:border-gold hover:text-gold transition-colors cursor-pointer text-sm"
        >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Sair
        </button>
    );
}
