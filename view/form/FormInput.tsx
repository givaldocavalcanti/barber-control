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