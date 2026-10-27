'use client'

import Link from "next/link";
import { useRecoverPassword } from "@/controllers";
import { StatusInfo } from "../../StatusInfo";
import { FormButton, FormInput, FormLabel, FormRow } from "../../form";
import { PublicPagesLayout } from "./PublicPagesLayout";

export function RecoverPassword() {
    const [status, handleSubmit] = useRecoverPassword();
    const inputClassName = "pb-2 border-b focus:outline-none focus:border-gold";

    return (
        <PublicPagesLayout
            headerText="Recuperar Acesso"
        >
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <FormRow className="flex-col">
                    <FormLabel
                        htmlFor="email"
                        className="mb-2 text-sm text-gold"
                    >
                        E-mail Cadastrado:
                    </FormLabel>
                    <FormInput
                        id="email"
                        type="text"
                        name="email"
                        className={inputClassName}
                        autoComplete="email"
                        placeholder="nome@exemplo.com"
                        required
                        aria-required="true"
                    />
                </FormRow>
                <FormButton
                    type="submit"
                    className="mt-4 py-3 font-semibold uppercase"
                    disabled={status.type === 'loading'}
                >
                    Enviar e-mail de recuperação
                </FormButton>

                {status.message && (
                    <FormRow>
                        <StatusInfo status={status} className="w-full text-center text-sm" />
                    </FormRow>
                )}

                <FormRow className="mt-8 flex justify-center text-sm text-gray-400 gap-2">
                    <Link href="/login" className="text-gold hover:underline">Voltar para Login</Link>
                </FormRow>
            </form>
        </PublicPagesLayout>
    );
}