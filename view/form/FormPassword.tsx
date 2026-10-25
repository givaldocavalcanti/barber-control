'use client'

import { useCallback, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormInput } from "./FormInput";

/**
 * Componente de campo de senha com alternância de visibilidade integrada.
 * 
 * Renderiza um `FormInput` envelopado de forma relativa com um botão absoluto 
 * (ícone de olho) que permite ao usuário alternar entre visualizar ou ocultar 
 * a senha digitada. O componente é construído com foco em acessibilidade (a11y), 
 * utilizando `aria-label` e `aria-pressed` dinâmicos, além de navegação por teclado.
 * 
 * @param props - Propriedades padrão de um elemento `<input>` HTML.
 * @param props.className - Classes CSS aplicadas ao contêiner `div` externo (wrapper).
 * @param props.inputClassName - Classes CSS aplicadas diretamente ao componente `FormInput` interno.
 * 
 * @example
 * ```tsx
 * <FormRow>
 *   <FormLabel htmlFor="password">Senha:</FormLabel>
 *   <FormPassword * id="password" name="password" placeholder="••••••••" required/>
 * </FormRow>
 * ```
 */

export function FormPassword({
    className,
    inputClassName,
    ...props
} : React.InputHTMLAttributes<HTMLInputElement>&{
    inputClassName?: string;
}){
    const [view, setView] = useState<boolean>(false);

    const handleView = useCallback(() => setView(prev => !prev), []);
    
    return (
        <div className={`relative flex flex-row items-center ${className}`}>
            <FormInput 
                className={`flex-1 pr-10 ${inputClassName}`}
                type={view ? "text" : "password"}
                {...props}
            />
            <button
                type="button"
                onClick={handleView}
                className="absolute right-2 text-gray-500 hover:text-gold transition-colors focus:outline-none focus:text-gold cursor-pointer"
                title={view ? "Ocultar senha" : "Mostrar senha"}
                aria-label={view ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={view}
            >
                { view ? 
                    <EyeOff size={20} aria-hidden="true" focusable="false" /> : 
                    <Eye size={20} aria-hidden="true" focusable="false" />
                }
            </button>
        </div>
    );
}