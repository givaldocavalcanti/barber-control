/**
 * Botão individual de aba (Tab) para navegação interna.
 * 
 * Desenhado para funcionar em conjunto com a `PageTablist`, este componente gere
 * a transição visual entre o estado ativo (destacado em dourado) e o estado inativo.
 * Mantém as boas práticas de acessibilidade ao aplicar estilos claros de foco pelo 
 * teclado (`focus-visible`) e ao assumir o `role="tab"` por padrão.
 * 
 * Uma vez que estende os atributos nativos de um `<button>` HTML, suporta 
 * nativamente eventos como `onClick` e atributos vitais como `aria-controls` e `aria-selected`.
 *
 * @param props - Propriedades do componente (aceita todos os atributos padrão de um botão HTML).
 * @param props.isActive - Determina se o botão é a aba atualmente selecionada. O padrão é `false`.
 * @param props.children - O rótulo de texto ou conteúdo a ser exibido dentro da aba.
 * 
 * @example
 * ```tsx
 * <PageTab>
 *   isActive={activeTab === 'perfil'}
 *   aria-controls="panel-perfil"
 *   aria-selected={activeTab === 'perfil'}
 *   onClick={()> setActiveTab('perfil')}
 * >
 *   Meu Perfil
 * </PageTab>
 * ```
 */

export function PageTab({
    children,
    className = "",
    role = "tab",
    type = "button",
    isActive = false,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {isActive?: boolean;}) {
    const tailwind = [
        "px-4 md:px-8 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none",
        isActive ? 'bg-gold text-charcoal' : 'bg-gray-200 text-gray-500 hover:text-charcoal',
        className
    ].join(" ").trim();

    return (
        <button
            type={type}
            role={role}
            className={tailwind}
            {...props}
        >
            {children}
        </button>
    );
}