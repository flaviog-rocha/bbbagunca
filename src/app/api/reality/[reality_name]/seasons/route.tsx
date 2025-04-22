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
    {params}: {params: {reality_name: string}}
){

    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const reality = await getReality(params.reality_name)

        if (!reality) {
            return NextResponse.json(
                {error: "Reality not found"},
                {status: 404}
            )
        }
        
        const seasons = await prisma.season.findMany({
            where: {
                id_reality: reality.id_reality
            },
            orderBy: {
                id_season: "asc"
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

export async function POST(req: NextRequest,
    {params}: {params: {reality_name: string}}
){
    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const reality = await getReality(params.reality_name)

        if (!reality) {
            return NextResponse.json(
                {error: "Reality not found"},
                {status: 404}
            )
        }

        const body = await req.json();

        const {codename, current, season_number} = body;

        if (!body.season_number){
            return NextResponse.json(
                {error: "Reality season number cannot be empty."},
                {status: 400}
            )
        }

        const new_season = await prisma.season.create({
            data: {
                codename,
                current,
                season_number,
                id_reality: reality.id_reality
            }
        })

        return NextResponse.json(new_season, {status: 201})
    }

    catch {
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }
}

export async function PUT(req: NextRequest){
    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const body = await req.json();

        if (!body.season_number){
            return NextResponse.json(
                {error: "Reality season number cannot be empty."},
                {status: 400}
            )
        }

        const {id_season, codename, current, season_number} = body;

        const updatedSeason = await prisma.season.update({
            where: {
                id_season
            },
            data: {
                codename,
                current,
                season_number,
            }
        })

        return NextResponse.json(
            updatedSeason, {status: 200}
        )
    }

    catch {
        return NextResponse.json(
            {error: "Season cannot be updated."},
            {status: 400}
        )
    }
}

export async function DELETE(req: NextRequest){
    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const body = await req.json();

        const {id_season} = body;

        await prisma.season.delete({
            where: {
                id_season
            }
        })

        return new NextResponse(null, {status: 204});
    }

    catch {
        return NextResponse.json(
            {error: "Season cannot be updated."},
            {status: 400}
        )
    }
}