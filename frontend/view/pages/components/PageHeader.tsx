import { User } from "@/models";

/**
 * Avatar visual do usuário.
 * 
 * Renderiza um círculo com as cores da marca contendo a primeira letra do nome do usuário.
 * O componente é puramente visual e está oculto para leitores de tela (`aria-hidden="true"`), 
 * uma vez que o nome completo já é lido no texto principal do cabeçalho.
 *
 * @param props.user - Objeto do usuário logado, usado para extrair a inicial do nome.
 * @param props.className - Classes Tailwind adicionais para sobrescrever margens ou tamanhos (opcional).
 * 
 * @example
 * ```tsx
 * <UserIcon className="mt-2" user="{userLogado}"/>
 * ```
 */

export function UserIcon({ 
    user,
    className="" 
}: { 
    user: User;
    className?: string; 
}) {
    const tailwind = [
        "w-12 h-12 md:w-14 md:h-14 bg-gold text-charcoal rounded-full",
        "flex items-center justify-center font-bold text-lg md:text-xl",
        className
    ].join(" ").trim();
    
    return (
        <div className={tailwind} aria-hidden="true">
            {user.nome?.charAt(0).toUpperCase() || 'C'}
        </div>
    );
}

/**
 * Cabeçalho principal e responsivo do painel.
 * 
 * Exibe uma área de boas-vindas com fundo escuro, extraindo automaticamente 
 * o primeiro nome do usuário logado e exibindo o avatar à direita. 
 * Adapta-se automaticamente a telas de smartphones e desktop.
 *
 * @param props.user - Objeto do usuário logado para renderizar o nome e o avatar.
 * @param props.headerText - Subtítulo descritivo exibido abaixo da saudação (opcional, padrão é "Bem-vindo").
 * 
 * @example
 * ```tsx
 * <PageHeader * headerText="Sua agenda e perfil" user="{userLogado}"/>
 * ```
 */

export function PageHeader({
    children,
    user,
    headerText
}: {
    children?: React.ReactNode;
    user: User;
    headerText?: string;
}) {
    return (
        <header className="w-full shrink-0 p-6 md:px-12 md:py-8 bg-charcoal text-white flex flex-col">
            <div className="mb-4 w-full flex flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Olá, {user.nome?.split(' ')[0] || 'Cliente'}
                    </h1>
                    <p className="text-gold text-sm md:text-base opacity-90">
                        {headerText || "Bem-vindo"}
                    </p>
                </div>

                <UserIcon user={user}/>
            </div>

            { children }
        </header>
    );
}