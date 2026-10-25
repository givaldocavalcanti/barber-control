import { NextResponse } from "next/server";
import { usuariosDB } from "@/lib/mockDB";

export async function GET(){
    return NextResponse.json(Array.from(usuariosDB.values()), {status: 200});
}