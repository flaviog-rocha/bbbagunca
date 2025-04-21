import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { apiReality } from "@/utils/interfaces";

const prisma = new PrismaClient();

async function getReality (params: string): Promise<apiReality | null>{
    const reality = await prisma.reality.findUnique({
        where: {
            name_code: params
        }
    })

    return reality;
}

export async function GET(req: NextRequest,
    {params}: {params: {name: string}}
){

    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const reality = await getReality(params.name)

        if (!reality) {
            return NextResponse.json(
                {error: "Reality not found"},
                {status: 404}
            )
        }
        
        const seasons = await prisma.season.findMany({
            where: {
                id_reality: reality.id_reality
            }
        })

        return NextResponse.json(
            seasons,
            {status: 200}
        )
    }
    catch {
        return NextResponse.json(
            {error: "FETCH-REALITY-ERROR"},
            {status: 400}
        )
    }
}