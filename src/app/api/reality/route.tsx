import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(){
    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const realities = await prisma.reality.findMany({
            orderBy: {
                id_reality: 'asc'
            }
        });
        return NextResponse.json(realities ?? []);
    }
    catch {
        return NextResponse.json(
            {error: "FETCH-REALITY-ERROR"},
            {status: 400}
        )
    }
}

export async function POST(req: NextRequest){
    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const body = await req.json();

        const {name, max_power, sec_power, danger_zone, safe_zone} = body;

        if (!body.name || body.name === ''){
            return NextResponse.json(
                {error: "EMPTY-REALITY-NAME"},
                {status: 400}
            )
        }

        const reality = await prisma.reality.create({
            data: {
                name,
                max_power,
                sec_power,
                danger_zone,
                safe_zone,
            },
        });

        return NextResponse.json(
            reality, {status: 201}
        )
    }
    catch(error) {
        console.error("Error during reality creation: ", error)

        return NextResponse.json(
            {error: "REALITY-CREATION-FAILED"},
            {status: 400}
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
        const {id_reality, name, max_power, sec_power, danger_zone, safe_zone} = body;

        if (!body.name || body.name === ''){
            return NextResponse.json(
                {error: "EMPTY-REALITY-NAME"},
                {status: 400}
            )
        }
        
        console.log(id_reality)
        const updatedReality = await prisma.reality.update({
            where: {
                id_reality
            },
            data: {
                name,
                max_power,
                sec_power,
                danger_zone,
                safe_zone,
            }
        });

        console.log(updatedReality)

        return NextResponse.json(
            updatedReality, {status: 200}
        )
    }
    catch (error) {
        console.error("Error during reality creation: ", error)

        return NextResponse.json(
            {error: "REALITY-UPDATE-FAILED"},
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
        const {id_reality} = body;

        await prisma.reality.delete({
            where: {
                id_reality
            }
        })

        return new NextResponse(null, {status: 204});
    }
    catch (error){
        console.log(error)
        return NextResponse.json(
            {error: "REALITY-DELETED-FAILED"},
            {status: 400}
        )
    }
}