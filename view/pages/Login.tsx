'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSubmit, useAuth } from "@/controller";
import { FormButton, FormRow } from "../form";
import { BarberLogo } from "../BarberLogo";
import { StatusInfo, StatusInfoType } from "../StatusInfo";

function LoginLabel({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label
            className="mb-2 text-sm text-gold uppercase tracking-wide"
            {...props}
        >
            {children}
        </label>
    );
}

function LoginInput({ type, placeholder, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    const className = [
        "pb-2 bg-transparent border-b transition-colors placeholder:text-gray-600",
        "focus:outline-none focus:border-gold"
    ].join(" ");

    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            {...props}
        />
    );
}

function LoginSocial({ children, type = "button", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const className = [
        "w-12 h-12 flex items-center justify-center border border-gray-400 rounded-md text-cream",
        "hover:border-gold hover:text-gold transition-colors cursor-pointer"
    ].join(" ");

    return (
        <button
            className={className}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

export function Login() {
    const router = useRouter();
    const { setUser } = useAuth();

    const [status, setStatus] = useState<StatusInfoType>({ type: 'idle' });

    async function handleSubmit(evt: React.SubmitEvent) {
        evt.preventDefault();

        const data = new FormData(evt.target);
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const result = await loginSubmit(email, password);

        if (result.error) {
            setStatus({ type: 'error', message: result.error });
            return;
        }

        if (result.user) { 
            setUser(result.user);
            router.replace("/");
        }
    }

    return (
        <main
            role="main"
            className="p-6 min-h-screen flex flex-col items-center justify-center font-sans text-cream"
        >
            <div
                className="w-full max-w-lg lg:p-4 rounded-lg lg:border border-gold/25"
            >
                <header className="mb-10 flex flex-col items-center">
                    <BarberLogo className="mb-4 w-18 h-18 text-gold" />
                    <h1 className="mb-1 text-3xl font-semibold">BarberControl</h1>
                    <p className="tracking-wide text-sm text-gold uppercase">Sua Barbearia sob controle</p>
                </header>

                {/* Formulário de Login*/}
                <section
                    className="w-full"
                    aria-labelledby="login-heading"
                >
                    <h2 id="login-heading" className="sr-only">Acesse sua conta</h2>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <FormRow className="flex-col">
                            <LoginLabel htmlFor="email">E-mail:</LoginLabel>
                            <LoginInput
                                id="email"
                                type="text"
                                name="email"
                                autoComplete="email"
                                placeholder="nome@exemplo.com"
                                required
                                aria-required="true"
                            />
                        </FormRow>
                        <FormRow className="flex-col">
                            <LoginLabel htmlFor="password">Senha: </LoginLabel>
                            <LoginInput
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                                aria-required="true"
                            />
                        </FormRow>

                        <FormRow className="justify-end">
                            <Link
                                href="/recuperar-senha"
                                className="text-gold font-sans hover:underline"
                            >
                                Esqueci minha senha
                            </Link>
                        </FormRow>

                        {status.type === "loading" ? (
                            <FormButton
                                type="submit"
                                className="mt-4 py-3 font-semibold uppercase animate-pulse"
                                disabled={true}
                            >
                                Logando...
                            </FormButton>
                        ) : (

                            <FormButton
                                type="submit"
                                className="mt-4 py-3 font-semibold uppercase"
                            >
                                Entrar
                            </FormButton>
                        )}

                        {status.message && (
                            <FormRow>
                                <StatusInfo status={status} className="w-full text-center text-sm"/>
                            </FormRow>
                        )}

                        <FormRow className="mt-8 flex-col items-center">
                            <div className="mb-4 w-full flex flex-row gap-2 items-center">
                                <hr className="grow border-cream border-t-gray-400" aria-hidden="true" />
                                <p className="h-full text-xs uppercase tracking-wider">Ou continue com</p>
                                <hr className="grow border-cream border-t-gray-400" aria-hidden="true" />
                            </div>

                            <div className="flex gap-4">
                                <LoginSocial
                                    onClick={() => router.push('/agendamentos')}
                                    aria-label="Entrar com Google"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 488 512" fill="currentColor" aria-hidden="true">
                                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                    </svg>
                                </LoginSocial>
                                <LoginSocial
                                    onClick={() => router.push('/agendamentos')}
                                    aria-label="Entrar com Facebook"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 320 512" fill="currentColor" aria-hidden="true">
                                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                    </svg>
                                </LoginSocial>
                                <LoginSocial
                                    onClick={() => router.push('/agendamentos')}
                                    aria-label="Entrar com X"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
                                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                    </svg>
                                </LoginSocial>
                                <LoginSocial
                                    onClick={() => router.push('/agendamentos')}
                                    aria-label="Entrar com Apple"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
                                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                    </svg>
                                </LoginSocial>
                            </div>
                        </FormRow>

                        <FormRow className="mt-8 text-center text-sm text-gray-400 gap-2">
                            Não tem conta?
                            <Link href="/cadastro" className="text-gold hover:underline">Cadastre-se agora</Link>
                        </FormRow>
                    </form>
                </section>
            </div>
        </main>
    );
}