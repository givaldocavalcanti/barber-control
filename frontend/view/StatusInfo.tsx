import { StatusInfoType } from "@/controllers";

export function StatusInfo({ 
    className="",
    status 
} : {
    className?: string;
    status: StatusInfoType;
}){
    if(!status.message) return null;

    const tailwind = [
        'font-sans',
        status.type === 'loading' ? "animate-pulse" : "",
        className
    ].join(" ").trim();
    
    return (
        <span className={tailwind}>
            { status.message}
        </span>
    );
}