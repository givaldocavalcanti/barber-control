import { User } from "./types";

export interface LoginResult {
    error?: string;
    user: User | null;
}

export async function loginSubmit(email: string, password: string) : Promise<LoginResult> {
    try{
        const result = await fetch("/api/login", {
            method: 'POST',
            body: JSON.stringify({email, password})
        });

        return (await result.json()) as LoginResult;
    } catch {
        return {error: "Não foi possível efetuar login.", user: null}
    }
}