/**
 * Contêiner semântico para abas de navegação (Tablist).
 * 
 * Atua como um agrupador (wrapper) para os botões de aba. Já inclui os 
 * atributos de acessibilidade necessários (`role="tablist"`) para que leitores 
 * de ecrã identifiquem a área como um menu de navegação, e aplica o estilo base
 * de fundo arredondado (pílula).
 *
 * @param props.className - Classes Tailwind adicionais para customizar margens, largura ou cores (opcional). Padrão é `""`.
 * @param props.children - Elementos React que representarão os botões individuais da aba (devem ter `role="tab"`).
 * 
 * @example
 * ```tsx
 * <PageTablist className="w-full md:w-auto mt-4">
 *   <button role="tab" aria-selected="true">Agendamentos</button>
 *   <button role="tab" aria-selected="false">Meu Perfil</button>
 * </PageTablist>
 * ```
 */

export function PageTablist({
    className="",
    children
} : {
    className?: string;
    children?: React.ReactNode;
}){
    return (
        <div 
            role="tablist"
            aria-label="Navegação Principal"
            className={`p-1 flex rounded-full ${className}`}
        >
            { children }
        </div>
    );
}