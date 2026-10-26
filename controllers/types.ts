export interface StatusInfoType{
    type: "idle" | "loading" | "success" | "error"; 
    message?: string;
}