"use client"

import { redirect } from 'next/navigation'
import { useEffect } from "react"

export default function Index(){
    const reality = "bbbagunca"
    useEffect(() => {
        redirect(`/${reality}`)
    })
    return (<html><body></body></html>)
}