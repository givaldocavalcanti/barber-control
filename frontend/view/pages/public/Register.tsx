'use client'

import { useRegisterClient } from "@/controllers";
import { FormButton, FormInput, FormInputDate, FormLabel, FormPassword, FormRow } from "../../form";
import { StatusInfo } from "../../StatusInfo";
import { PublicPagesLayout } from "./PublicPagesLayout";


export function Register() {
    const [status, handleSubmit] = useRegisterClient();
    const labelClassName = "mb-2 text-sm text-gold";
    const inputClassName = "pb-2 w-full border-b focus:outline-none focus:border-gold";

    return (
        <PublicPagesLayout headerText="Junte-se aos Alphas">
            <h2 id="register-heading" className="sr-only">Faça seu cadastro</h2>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <FormRow className="flex-col">
                    <FormLabel
                        htmlFor="nome"
                        className={labelClassName}
                    >
                        Nome Completo:
                    </FormLabel>
                    <FormInput
                        id="nome"
                        type="text"
                        name="nome"
                        className={inputClassName}
                        placeholder="Seu nome completo"
                        required
                        aria-required="true"
                    />
                </FormRow>

                <FormRow className="flex-col">
                    <FormLabel
                        htmlFor="email"
                        className={labelClassName}
                    >
                        E-mail:
                    </FormLabel>
                    <FormInput
                        id="email"
                        type="text"
                        name="email"
                        className={inputClassName}
                        placeholder="nome@exemplo.com"
                        required
                        aria-required="true"
                    />
                </FormRow>

                <FormRow className="flex-col">
                    <FormLabel
                        htmlFor="telefone"
                        className={labelClassName}
                    >
                        Telefone / WhatsApp:
                    </FormLabel>
                    <FormInput
                        id="telefone"
                        type="tel"
                        name="telefone"
                        className={inputClassName}
                        placeholder="(00) 00000-0000"
                        required
                        aria-required="true"
                    />
                </FormRow>

                <FormRow className="flex-col">
                    <FormLabel
                        htmlFor="dataNascimento"
                        className={labelClassName}
                    >
                        Data de Nascimento:
                    </FormLabel>
                    <FormInputDate
                        id="dataNascimento"
                        type="date"
                        name="dataNascimento"
                        className={`${inputClassName} text-cream scheme-dark [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition-opacity`}
                        placeholder="00/00/0000"
                        required
                        aria-required="true"
                    />
                </FormRow>

                <FormRow className="flex-col">
                    <FormLabel 
                        htmlFor="password"
                        className={labelClassName}
                    >
                        Senha:
                    </FormLabel>
                    <FormPassword 
                        id="password"
                        name="password"
                        inputClassName={inputClassName}
                        minLength={6}
                        required
                        aria-required="true"
                    />
                </FormRow>

                <FormRow className="flex-col">
                    <FormLabel 
                        htmlFor="confirmPassword"
                        className={labelClassName}
                    >
                        Confirmar Senha:
                    </FormLabel>
                    <FormPassword 
                        id="confirmPassword"
                        name="confirmPassword"
                        inputClassName={inputClassName}
                        minLength={6}
                        required
                        aria-required="true"
                    />
                </FormRow>

                <FormButton
                    type="submit"
                    className="mt-4 py-3 font-semibold uppercase"
                    disabled={status.type === 'loading'}
                >
                    Entrar para a matilha
                </FormButton>

                {status.message && (
                    <FormRow>
                        <StatusInfo status={status} className="w-full text-center text-sm" />
                    </FormRow>
                )}
            </form>
        </PublicPagesLayout>
    );
}