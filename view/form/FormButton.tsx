/**
 * Componente que renderiza um botão do formulário já estilizado.
 * 
 *
 * @param props - Propriedades padrão de um elemento BUTTON nativo.
 * @returns Um elemento `<button>` estilizado.
 * 
 * @example
 *<FormRow className="max-lg flex-col gap-1" >
 *      <label>Nome:</label>
 *      <input name="nome" />
 * </FormRow>
 */

export function FormButton({
    children,
    className = "",
    type = "button",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const tailwind = [
        "cursor-pointer bg-gold text-black rounded-md transition-colors",
        "hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed",
        className
    ].join(" ").trim();

    return (
        <button
            type={type}
            className={tailwind}
            {...props}
        >
            {children}
        </button>
    );
}