'use client'

import Input from "./Input";
import { Roboto } from "next/font/google";
import { getInfoKey } from "@/utils/objectFunctions";
import { infosInterface } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function CrudSeason({infos, crudAction, setModal, setCrudReality}: infosInterface){
    // const addReality = async () => {
    //     setCrudReality({
    //         name: realityName,
    //         max_power: maxPower,
    //         sec_power: secPower,
    //         danger_zone: dangerZone,
    //         safe_zone: safeZone,
    //     })
    // }

    // const updateReality = async () => {
    //     setCrudReality({
    //         id_reality: realityId,
    //         name: realityName,
    //         max_power: maxPower,
    //         sec_power: secPower,
    //         danger_zone: dangerZone,
    //         safe_zone: safeZone,
    //     })
    // }

    const saveReality = () => {
        if (!seasonNumber || seasonNumber === ""){
            setSeasonNumberError("Número da temporada não pode ser vazio!")
            return;
        }

        else if (/^\d+$/.test(seasonNumber)){
            setSeasonNumberError("Campo deve ser um valor numérico!")
            return;
        }
        
        // if (crudAction === "add"){
        //     addReality()
        // }

        // else {
        //     updateReality()
        // }

        setModal(false)
    }
    
    const [seasonId, setSeasonId] = useState<number>();
    const [seasonNumber, setSeasonNumber] = useState<string>("");
    const [seasonNumberError, setSeasonNumberError] = useState<string>("");
    const [codiname, setCodiname] = useState<string>("");
    const [currentSeason, setCurrentSeason] = useState<boolean>(false);

    // useEffect(() => {
    //     if (infos){
    //         setRealityId(Number(getInfoKey(infos, "id_reality")))
    //         setRealityName(getInfoKey(infos, "name"));
    //         setmaxPower(getInfoKey(infos, "max_power"));
    //         setSecPower(getInfoKey(infos, "sec_power"));
    //         setDangerZone(getInfoKey(infos, "danger_zone"));
    //         setSafeZone(getInfoKey(infos, "safe_zone"));
    //     }
    // }, [])

    return (
        <div className="justify-center flex">
            <form className="" onSubmit={(e) => {
                e.preventDefault()
                // saveReality();
                }}
            >
                <Input inputName="Número da Temporada" id="name" className="m-4" value={seasonNumber} changeFunction={setSeasonNumber} error={seasonNumberError}/>
                <Input inputName="Codinome" id="max-power" className="m-4" value={codiname} changeFunction={setCodiname}/>
                <div className="flex justify-end pr-6">
                    <Checkbox state={currentSeason} setState={setCurrentSeason} text="Temporada Atual?"/>
                </div>
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