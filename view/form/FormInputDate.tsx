'use client'
import { useCallback, useState } from "react";
import { FormInput } from "./FormInput";

/**
 * Componente especializado de entrada de data (input type="date").
 * 
 * Estende o `FormInput` base, injetando classes específicas do Tailwind
 * para estilizar o ícone do calendário nativo (pseudo-elemento `::-webkit-calendar-picker-indicator`)
 * nos navegadores Webkit (Chrome, Safari, Edge). Aplica transições de opacidade
 * para um efeito de hover suave que se integra melhor a fundos escuros.
 * 
 * @param props - Propriedades padrão de um elemento `<input>` HTML.
 * 
 * @example
 * ```tsx
 * <FormInputDate className="text-cream [color-scheme:dark]" name="nascimento" required/>
 * ```
 */

export function FormInputDate({
    className = "",
    type = "date",
    onKeyDown,
    onBlur,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
    const [hasValue, setHasValue] = useState<boolean>(false);

    const handleKeyDown = useCallback((evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (!hasValue && evt.key !== 'Tab') { setHasValue(true); }
        if (onKeyDown) onKeyDown(evt);
    }, [hasValue, onKeyDown]);

    const handleBlur = useCallback((evt: React.FocusEvent<HTMLInputElement>) => {
        setHasValue(evt.target.value !== "");
        if (onBlur) onBlur(evt);
    }, [onBlur]);

    const tailwind = [
        hasValue ? "text-cream" : "text-gray-600",
        "transition-opacity",
        "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
        "[&::-webkit-calendar-picker-indicator]:opacity-50",
        "hover:[&::-webkit-calendar-picker-indicator]:opacity-100",
        className
    ].join(" ").trim();

    return (
        <FormInput
            className={tailwind}
            type={type}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            {...props}
        />
    );

}