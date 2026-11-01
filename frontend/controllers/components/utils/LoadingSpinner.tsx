import { BarberLogo } from "./BarberLogo";

/**
 * Indicador visual de carregamento (spinner) animado com logo central.
 * 
 * Renderiza um círculo giratório com as cores padrão da marca (carvão com topo dourado) 
 * e posiciona a logo da barbearia no centro com um leve efeito de pulso (pulse).
 * O anel possui um tamanho mínimo padrão (`min-h-16 min-w-16`), mas as propriedades
 * permitem injetar classes Tailwind separadamente para o anel e para a logo.
 *
 * @param props.spinnerClassName - Classes Tailwind adicionais para o anel giratório (opcional). Padrão é `""`.
 * @param props.logoClassName - Classes Tailwind adicionais para a logo central (opcional). Padrão é `""`.
 * 
 * @example
 * ```tsx
 * // Spinner padrão
 * <LoadingSpinner/>
 * 
 * // Customizando margens do anel e alterando a cor da logo
 * <LoadingSpinner * logoClassName="text-white" spinnerClassName="mt-8"/>
 * ```
 */

export function LoadingSpinner({
    spinnerClassName="",
    logoClassName=""
}: { 
    spinnerClassName?: string;
    logoClassName?: string;
}){
    const tailwind = [
        "min-h-16 min-w-16 border-4 border-charcoal border-t-gold",
        "rounded-full animate-spin",
        spinnerClassName
    ].join(" ").trim();

    return (
        <div className="relative inline-flex items-center justify-center">
            <div className={ tailwind } />
            <BarberLogo className={`absolute text-gold w-14 h-14 animate-pulse ${logoClassName}`} />
        </div>
    );
}