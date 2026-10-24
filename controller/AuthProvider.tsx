'use client'
import React, { useContext, useState } from "react";
import { User } from "./types";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = React.createContext<AuthContextType>({
    user: null,
    setUser: () => {}
});

/**
 * Provedor de contexto de autenticação da aplicação.
 * 
 * Este componente atua como o Model/Controller da sessão do usuário no lado do cliente.
 * Ele gerencia o estado global de quem está logado e disponibiliza essas informações
 * para todos os componentes filhos na árvore do React.
 * 
 * @param props.children - Os componentes da interface que terão acesso aos dados de autenticação.
 * 
 * @returns Um provedor React que encapsula a aplicação com os dados do usuário.
 */

export function AuthProvider({ children } : {children?: React.ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    
    return (
        <AuthContext.Provider value={{user, setUser}}>
            { children }
        </AuthContext.Provider>
    );
}

/**
 * Hook customizado para consumir os dados de autenticação da aplicação.
 * 
 * Permite que qualquer componente (View) acesse facilmente o usuário logado
 * ou dispare uma atualização no estado de autenticação.
 * 
 * @returns O contexto atual contendo o `user` e a função `setUser`.
 * 
 * @example
 * ```tsx
 * const { user, setUser } = useAuth();
 * 
 * if (user?.type === 'admin') {
 *   console.log("Olá, Administrador!");
 * }
 * ```
 */

export const useAuth = () => useContext(AuthContext);