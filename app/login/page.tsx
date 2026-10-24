import { Metadata } from "next";
import { Login } from "@/view";

export const metadata : Metadata = {
    title: "Entrar"
}

export default function LoginPage() {
  return <Login />
}