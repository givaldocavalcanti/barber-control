import { NextResponse } from "next/server";
import { usuariosDB, servicosDB, agendamentosDB } from "@/lib/mockDB";


//ROTA DE CHECAGEM PARA DESENVOLVIMENTO
export async function GET(){
    const database = {
        users: Array.from(usuariosDB.values()),
        produtos: Array.from(servicosDB.values()),
        agendamentosDB: Array.from(agendamentosDB.values())
    }

    return NextResponse.json(database, {status: 200});
}