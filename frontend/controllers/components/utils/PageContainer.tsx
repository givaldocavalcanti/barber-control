/**
 * Contêiner de layout principal da página.
 * 
 * Ocupa a altura total da tela (`min-h-screen`), aplica a cor de fundo creme
 * e centraliza todo o seu conteúdo perfeitamente no meio da tela utilizando Flexbox.
 * Ideal para encapsular as telas raiz de cada perfil de usuário.
 * @param props.className - Para estilização com tailwind/CSS
 * @param props.children - Elementos React que serão renderizados no centro da tela.
 * 
 * @example
 * ```tsx
 * <PageContainer>
 *   <ClientDashboard/>
 * </PageContainer>
 * ```
 */

export function PageContainer({
    className="",
    children
} : {
    className?: string;
    children?: React.ReactNode
}){
    const tailwind = [
        "relative min-h-screen bg-cream",
        "flex flex-col items-center justify-center",
        className
    ].join(" ").trim();
    
    return (
        <main
            role="main"
            className={tailwind}
        >
            { children }
        </main>
    );
} 