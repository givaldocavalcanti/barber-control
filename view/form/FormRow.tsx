/**
 * Componente que renderiza uma linha do formulário.
 * 
 *
 * @param props - Propriedades padrão de um elemento DIV nativo.
 * @returns Um elemento `<div>` que encapsula campos do formulário como labels e inputs .
 * 
 * @example
 * <FormRow className="max-lg flex-col gap-1" >
 *      <label>Nome:</label>
 *      <input name="nome" />
 * </FormRow>
 */

export function FormRow({
    className="",
    children,
    ...props
} : React.HTMLAttributes<HTMLDivElement>){
    return (
        <div className={`w-full flex ${className}`} { ...props }>
            { children }
        </div>
    );
}