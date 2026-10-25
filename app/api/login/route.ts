import { NextRequest, NextResponse } from "next/server";
import { usuariosDB } from "@/lib/mockDB";

interface UserCredentials {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    const { email, password } = (await request.json()) as UserCredentials;
    const data = usuariosDB.get(email);

    if(!data){
        return NextResponse.json(
            { error: 'Usuário não encontrado.', user: null },
            { status: 403 }
        );
    }

    const {password: userPassword, ...user} = data; //estrai a senha

    if(userPassword !== password){
        return NextResponse.json(
            { error: 'Senha inválida.', user: null },
            { status: 403 }
        );
    }
   
    const response = NextResponse.json({ user }, { status: 200 });
    response.cookies.set({
        name: 'barber-session',
        value: JSON.stringify(user),
        httpOnly: true,       //evita acesso no front
        path: '/',
        maxAge: 60 * 60 * 24  // 1 dia
    });

    return response;
}