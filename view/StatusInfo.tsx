export interface StatusInfoType{
    type: "idle" | "loading" | "success" | "error"; 
    message?: string;
}

export function StatusInfo({ 
    className="",
    status 
} : {
    className?: string;
    status: StatusInfoType;
}){
    if(!status.message) return null;
    
    return (
        <span className={`font-sans ${className}`}>
            { status.message}
        </span>
    );
}