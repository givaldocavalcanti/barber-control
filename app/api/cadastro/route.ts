import { NextRequest, NextResponse } from "next/server";
import { User } from "@/controllers";
import { usuariosDB } from "@/lib/mockDB";


export async function POST(request: NextRequest) {
    const { email, password, nome, telefone, type } = (await request.json()) as User;

    const user = usuariosDB.get(email);
    if(user && user.type === type){
        return NextResponse.json(
            {error: "Já existe um parceiro com este e-mail."}, 
            {status: 409}
        );
    }

    usuariosDB.set(email, {email, password, nome, type, telefone});

    return NextResponse.json({message: 'Parabéns por entrar para o bando.'} , {status: 201});
}