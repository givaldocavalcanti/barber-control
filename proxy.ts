import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest){
    const session = request.cookies.get("barber-session")?.value;
    const url = request.nextUrl.clone();

    const publicRoutes = ['/login', '/cadastro', '/recuperar-senha'];
    const isPublicRoute = publicRoutes.includes(url.pathname);

    //Não tá logado
    if(!session){
        //Tá tentando acessar rotas privadas
        if(!isPublicRoute){
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    if(isPublicRoute){
        //Tá em rota publica, vai pra tela inicial
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)'],
};