import { Metadata } from "next";
import { RecoverPassword } from "@/view";

export const metadata: Metadata = {
    title: "Recuperar Senha"
}

export default function LoginPage() {
    return <RecoverPassword />
}