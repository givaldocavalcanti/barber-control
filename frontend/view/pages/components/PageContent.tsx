export function PageContent({
    className="",
    children
} : {
    className?: string;
    children?: React.ReactNode;
}){
    return (
        <div className={`w-full bg-cream flex-1 overflow-y-auto text-sans ${className}`.trim()}>
            { children }
        </div>
    );
}