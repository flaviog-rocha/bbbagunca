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
    {params}: {params: {reality_name: string, season_number: string}}
){
    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const id_reality = (await getReality(params.reality_name))?.id_reality
        const season_number = Number(params.season_number)

        if (!id_reality){
            return NextResponse.json({error: "Reality não encontrado"}, {status: 400})
        }

        const season = await prisma.season.findUnique({
            where: {
                season_number_id_reality: {
                    season_number,
                    id_reality
                }
            }
        })

        return NextResponse.json(season, {status: 200})
    }
    catch {

    }
}