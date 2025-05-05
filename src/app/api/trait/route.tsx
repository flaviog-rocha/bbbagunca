import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { apiReality } from "@/utils/interfaces";

const prisma = new PrismaClient();

export async function GET(){
    if (!process.env.DATABASE_URL){
        return NextResponse.json(
            {error: "DATABASE-NOT-SET"},
            {status: 500}
        )
    }

    try {
        const traits = await prisma.trait.findMany({
            orderBy: {
                id_trait: 'asc'
            }
        })

        return NextResponse.json(traits ?? []);
    }
    catch {
        return NextResponse.json(
            {error: "FETCH-TRAITS-ERROR"},
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

        const {trait, trait_f} = body;

        if (!trait || trait === ""){
            return NextResponse.json(
                {error: "EMPTY-TRAIT-NAME"},
                {status: 400}
            )
        }

        const newTrait = await prisma.trait.create({
            data: {
                trait,
                trait_f
            }
        })

        return NextResponse.json(
            newTrait, {status: 201}
        )
    }

    catch(error) {
        console.error("Error during trait creation: ", error)

        return NextResponse.json(
            {error: "TRAIT-CREATION-FAILED"},
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

        const {id_trait, trait, trait_f} = body;

        if (!trait || trait === ""){
            return NextResponse.json(
                {error: "EMPTY-TRAIT-NAME"},
                {status: 400}
            )
        }

        console.log(body)
        
        const newTrait = await prisma.trait.update({
            where: {
                id_trait
            },
            data: {
                trait,
                trait_f
            }
        })

        return NextResponse.json(
            newTrait, {status: 200}
        )
    }

    catch(error) {
        console.error("Error during trait creation: ", error)

        return NextResponse.json(
            {error: "TRAIT-UPDATE-FAILED"},
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

        const {id_trait} = body;

        await prisma.trait.delete({
            where: {
                id_trait
            }
        })

        return new NextResponse(null, {status: 204})
    }

    catch(error) {
        console.error("Error during trait creation: ", error)

        return NextResponse.json(
            {error: "TRAIT-UPDATE-FAILED"},
            {status: 400}
        )
    }
}

