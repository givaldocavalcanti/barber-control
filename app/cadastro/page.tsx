import { Metadata } from "next";
import { Register } from "@/view";

export const metadata : Metadata = {
    title: "Cadastro"
}

export default function RegisterPage() {
  return <Register />
}