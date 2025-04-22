'use client'

import Input from "./Input";
import { Roboto } from "next/font/google";
import { getInfoKey } from "@/utils/objectFunctions";
import { crudSeason } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function CrudSeason({infos, crudAction, setModal, setCrudSeason}: crudSeason){
    const addSeason = () => {
        setCrudSeason({
            season_number: Number(seasonNumber),
            codename: codename,
            current: currentSeason
        })
    }

    const updateReality = async () => {
        setCrudSeason({
            id_season: Number(seasonId),
            season_number: Number(seasonNumber),
            codename: codename,
            current: currentSeason
        })
    }

    const saveReality = () => {
        if (!seasonNumber || seasonNumber === ""){
            setSeasonNumberError("Número da temporada não pode ser vazio!")
            return;
        }

        else if (!/^\d+$/.test(seasonNumber)){
            setSeasonNumberError("Campo deve ser um valor numérico!")
            return;
        }
        
        if (crudAction === "add"){
            addSeason()
        }

        else {
            updateReality()
        }

        setModal(false)
    }
    
    const [seasonId, setSeasonId] = useState<number>();
    const [seasonNumber, setSeasonNumber] = useState<string>("");
    const [seasonNumberError, setSeasonNumberError] = useState<string>("");
    const [codename, setCodename] = useState<string>("");
    const [currentSeason, setCurrentSeason] = useState<boolean>(false);

    useEffect(() => {
        if (infos){
            setSeasonId(Number(getInfoKey(infos, "id_season")))
            setSeasonNumber(getInfoKey(infos, "season_number"));
            setCodename(getInfoKey(infos, "codename"));
            setCurrentSeason(getInfoKey(infos, "current") === 'true');
        }
    }, [])

    return (
        <div className="justify-center flex">
            <form className="" onSubmit={(e) => {
                e.preventDefault()
                saveReality();
                }}
            >
                <Input inputName="Número da Temporada" id="name" className="m-4" value={seasonNumber} changeFunction={setSeasonNumber} error={seasonNumberError}/>
                <Input inputName="Codinome" id="max-power" className="m-4" value={codename} changeFunction={setCodename}/>
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