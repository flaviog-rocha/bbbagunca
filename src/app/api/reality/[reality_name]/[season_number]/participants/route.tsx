import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { crudSeasonInfosWithReality } from "@/utils/interfaces";

const prisma = new PrismaClient();

async function getSeason (reality_name: string, season_number: number): Promise<crudSeasonInfosWithReality | null>{
    const season = await prisma.season.findFirst({    
        include: {
            reality: true,
        },
        where: {
            reality: {
                name_code: reality_name
            },
            season_number,
        }
    })

    return season;
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
        const season = await getSeason(params.reality_name, Number(params.season_number))

        if (!season) {
            return NextResponse.json(
                {error: "Season not found"},
                {status: 404}
            )
        }
        
        // const reality = params.reality_name
        const participants = await prisma.season.findMany({
            where: {
                id_season: season.id_season
            },
            orderBy: {
                id_season: "asc"
            }
        })

        return NextResponse.json({participants}, {status: 200})
    }
    catch {
        return NextResponse.json(
            {error: "FETCH-REALITY-ERROR"},
            {status: 400}
        )
    }
}

export async function POST(req: NextRequest,
    {params}: {params: {reality_name: string, season_number: string}}
){
    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const season = await getSeason(params.reality_name, Number(params.season_number))

        if (!season) {
            return NextResponse.json(
                {error: "Season not found"},
                {status: 404}
            )
        }

        const body = await req.json();

        console.log("BODY:")
        console.log(body)
        const {name, gender, age, biografy, profession, traits} = body.participant;

        // if (!body.season_number){
        //     return NextResponse.json(
        //         {error: "Reality season number cannot be empty."},
        //         {status: 400}
        //     )
        // }

        console.log(name)
        console.log(`name: ${name.toLowerCase()}`)
        const name_code = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/ /g, "_")
        const new_participant = await prisma.participant.create({
            data: {
                name,
                name_code,
                gender,
                age,
                biografy,
                profession,
                status: "ON-GAME",
                id_season: season.id_season,
                traits: {
                    connect: traits
                },
            }
        })

        return NextResponse.json(new_participant, {status: 201})
    }

    catch (e) {
        console.log("ERRO:")
        console.log(e)
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }
}

// export async function PUT(req: NextRequest){
//     if (!process.env.DATABASE_URL){
//         return NextResponse.json(
//             {error: "DATABASE-NOT-SET"},
//             {status: 500}
//         )
//     }

//     try {
//         const body = await req.json();

//         if (!body.season_number){
//             return NextResponse.json(
//                 {error: "Reality season number cannot be empty."},
//                 {status: 400}
//             )
//         }

//         const {id_season, codename, current, season_number} = body;

//         const updatedSeason = await prisma.season.update({
//             where: {
//                 id_season
//             },
//             data: {
//                 codename,
//                 current,
//                 season_number,
//             }
//         })

//         return NextResponse.json(
//             updatedSeason, {status: 200}
//         )
//     }

//     catch {
//         return NextResponse.json(
//             {error: "Season cannot be updated."},
//             {status: 400}
//         )
//     }
// }

// export async function DELETE(req: NextRequest){
//     if (!process.env.DATABASE_URL){
//         return NextResponse.json(
//             {error: "DATABASE-NOT-SET"},
//             {status: 500}
//         )
//     }

//     try {
//         const body = await req.json();

//         const {id_season} = body;

//         await prisma.season.delete({
//             where: {
//                 id_season
//             }
//         })

//         return new NextResponse(null, {status: 204});
//     }

//     catch {
//         return NextResponse.json(
//             {error: "Season cannot be updated."},
//             {status: 400}
//         )
//     }
// }