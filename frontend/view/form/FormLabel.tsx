/**
 * Componente que renderiza uma label do formulário.
 * 
 *
 * @param props - Propriedades padrão de um elemento LABEL nativo.
 * @returns Um elemento `<label>` padrão estilizado.
 * 
 * @example
 * <FormRow className="max-lg flex-col gap-1" >
 *      <FormLabel>Nome:</FormLabel>
 *      <FormInput name="nome" />
 * </FormRow>
 */

export function FormLabel({ 
    children,
    className="", 
    ...props 
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            className={`uppercase tracking-wide ${className}`.trim()}
            {...props}
        >
            {children}
        </label>
    );
}