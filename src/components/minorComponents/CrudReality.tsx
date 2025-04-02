'use client'

import Input from "./Input";
import { Roboto } from "next/font/google";
import { getInfoKey } from "@/utils/objectFunctions";
import { infosInterface } from "@/utils/interfaces";
import { useEffect, useState } from "react";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function CrudReality({infos, crudAction, setModal}: infosInterface){
    const addReality = async () => {
        await fetch("/api/reality", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: realityName,
                max_power: maxPower,
                sec_power: secPower,
                danger_zone: dangerZone,
                safe_zone: safeZone,
            })
        })
    }

    const updateReality = async () => {
        await fetch("/api/reality", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_reality: realityId,
                name: realityName,
                max_power: maxPower,
                sec_power: secPower,
                danger_zone: dangerZone,
                safe_zone: safeZone,
            })
        })
    }

    const saveReality = () => {
        if (crudAction === "add"){
            addReality()
        }

        else {
            updateReality()
        }

        setModal(false)
    }
    
    const [realityId, setRealityId] = useState<number>();
    const [realityName, setRealityName] = useState<string>("");
    const [maxPower, setmaxPower] = useState<string>("");
    const [secPower, setSecPower] = useState<string>("");
    const [dangerZone, setDangerZone] = useState<string>("");
    const [safeZone, setSafeZone] = useState<string>("");

    useEffect(() => {
        console.log(infos)
        if (infos){
            setRealityId(Number(getInfoKey(infos, "id_reality")))
            setRealityName(getInfoKey(infos, "name"));
            setmaxPower(getInfoKey(infos, "max_power"));
            setSecPower(getInfoKey(infos, "sec_power"));
            setDangerZone(getInfoKey(infos, "danger_zone"));
            setSafeZone(getInfoKey(infos, "safe_zone"));
        }
    }, [])

    return (
        <div className="justify-center flex">
            <form className="" onSubmit={(e) => {
                e.preventDefault()
                saveReality();
                }}
            >
                <Input inputName="Nome do Reality" id="name" className="m-4" value={realityName} changeFunction={setRealityName}/>
                <Input inputName="Poder Máximo" id="max-power" className="m-4" value={maxPower} changeFunction={setmaxPower}/>
                <Input inputName="Poder Secundário" id="sec-power" className="m-4" value={secPower} changeFunction={setSecPower}/>
                <Input inputName="Risco de Eliminação" id="danger-zone" className="m-4" value={dangerZone} changeFunction={setDangerZone}/>
                <Input inputName="Salvação" id="safe-zone" className="m-4" value={safeZone} changeFunction={setSafeZone}/>
                <div className="w-full flex justify-end">
                    <button 
                        className={`bg-mainThemePrimary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-mainThemeSecondary 
                                    transition duration-200 rounded-xl m-4`
                                }
                        >
                            Salvar
                        </button>
                </div>
            </form>
        </div>
    )
}