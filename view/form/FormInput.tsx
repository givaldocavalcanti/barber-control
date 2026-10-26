/**
 * Componente base de entrada de dados (input) para formulários.
 * 
 * Encapsula o elemento `<input>` nativo do HTML, aplicando uma estilização
 * inicial com fundo transparente e cores de placeholder padronizadas.
 * Aceita todas as propriedades padrão de um input HTML, permitindo extensão
 * livre através da propriedade `className`.
 * 
 * @param props - Propriedades padrão de um elemento `<input>` HTML.
 * 
 * @example
 * ```tsx
 * <FormInput className="border-b border-gray-600 focus:border-gold" placeholder="Seu nome" type="text"/>
 * ```
 */

export function FormInput({ 
    className="",
    ...props 
}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`bg-transparent transition-colors placeholder:text-gray-600 ${className}`.trim()}
            {...props}
        />
    );
}