/**
 * Componente visual que renderiza o logotipo da aplicação BarberControl.
 * 
 * Este componente encapsula um SVG vetorial estilizado que se adapta a tamanhos 
 * e cores dinamicamente utilizando as propriedades do Tailwind CSS (através de `className`).
 * Por padrão, a cor das linhas herda a cor do texto do elemento pai (`currentColor`).
 *
 * @param props - Propriedades padrão de um elemento SVG nativo no React (ex: className, viewBox).
 * @returns Um elemento `<svg>` representando o logotipo do sistema.
 * 
 * @example
 * // Exemplo de uso aplicando tamanho 64x64px (w-16 h-16) e a cor dourada do tema:
 * <BarberLogo className="w-16 h-16 text-[var(--color-gold)]" />
 */

export function BarberLogo({
    className,
    viewBox="0 0 24 24",
    fill="none",
    stroke="currentColor",
    strokeWidth="1.2",
    strokeLinecap="round",
    strokeLinejoin="round",
    ...props
} : React.SVGAttributes<SVGElement>){
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin}
            className={className}
            aria-hidden="true"
            { ...props }
        >
            <circle cx="12" cy="12" r="11" />
            <path d="M9 7L12 9.5L15 7" />
            <line x1="7.5" y1="12" x2="16.5" y2="12" />
            <path d="M9 17L12 14.5L15 17" />
        </svg>
    );
}