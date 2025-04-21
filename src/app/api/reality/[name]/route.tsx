import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Response,
    {params}: {params: {name: string}}
){

    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const reality = await prisma.reality.findUnique({
            where: {
                name_code: params.name
            }
        });
        return NextResponse.json(reality, {status: 200});
    }
    catch {
        return NextResponse.json(
            {error: "FETCH-REALITY-ERROR"},
            {status: 400}
        )
    }
}