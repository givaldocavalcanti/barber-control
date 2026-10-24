import { NextRequest, NextResponse } from "next/server";
import { User } from "@/controller";

interface UserCredentials {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    let userData: User | null = null;
    const { email, password } = (await request.json()) as UserCredentials;

    //mock de login
    if (password !== '123456') {
        return NextResponse.json(
            { error: 'Usuário/Senha inválido.', user: userData },
            { status: 403 }
        );
    }


    // Busca no banco de dados
    switch (email.toLowerCase()) {
        case "user@user.com":
            userData = {
                email: "user@user.com",
                nome: "Usuario",
                type: 'cliente'
            };
            break;
        case "barber@barber.com":
            userData = {
                email: "barber@barber.com",
                nome: "Barbeiro",
                type: 'barbeiro'
            };
            break;
        case "admin@barber.com":
            userData = {
                email: "admin@barber.com",
                type: 'admin'
            };
            break;
    }

    if(userData){
        const response = NextResponse.json({ user: userData }, { status: 200 });
        response.cookies.set({
            name: 'barber-session',
            value: JSON.stringify(userData),
            httpOnly: true,     //evita acesso no front
            path: '/',
            maxAge: 60 * 60 * 24 // 1 dia
        });

        return response;
    }

    return NextResponse.json(
        { error: 'Usuário não encontrado.', user: null },
        { status: 403 }
    );
}