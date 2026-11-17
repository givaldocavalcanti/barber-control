export const DEMO_PASSWORD = "123456";

export const DEMO_ACCOUNTS = [
    { role: "cliente", email: "jhonatan@user.com", note: "Painel mais completo" },
    { role: "barbeiro", email: "julio@barber.com", note: "Painel em desenvolvimento" },
    { role: "administrador", email: "breno@barber.com", note: "Painel em desenvolvimento" },
] as const;

/**
 * Lista as contas de teste do seed para quem visita a demonstração.
 *
 * Cada linha é um botão que entrega e-mail e senha para `onSelect`,
 * que preenche o formulário de login.
 *
 * @param props.onSelect - Recebe o e-mail e a senha da conta escolhida.
 */

export function DemoAccounts({ onSelect }: { onSelect: (email: string, password: string) => void }) {
    return (
        <section
            aria-labelledby="demo-accounts-heading"
            className="mt-8 p-4 rounded-md border border-gold/25 text-sm"
        >
            <h3 id="demo-accounts-heading" className="mb-1 text-gold uppercase tracking-wider text-xs">
                Contas de teste
            </h3>
            <p className="mb-3 text-gray-400">
                Senha de todas: <code className="text-cream">{DEMO_PASSWORD}</code>. Clique para preencher.
            </p>

            <ul className="flex flex-col gap-2">
                {DEMO_ACCOUNTS.map(({ role, email, note }) => (
                    <li key={email}>
                        <button
                            type="button"
                            aria-label={`Entrar como ${role}: ${email}`}
                            onClick={() => onSelect(email, DEMO_PASSWORD)}
                            className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md border border-gray-600 text-left hover:border-gold transition-colors cursor-pointer"
                        >
                            <span className="flex flex-col">
                                <span className="capitalize">{role}</span>
                                <span className="text-xs text-gray-400">{note}</span>
                            </span>
                            <span className="text-gold text-xs break-all">{email}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
