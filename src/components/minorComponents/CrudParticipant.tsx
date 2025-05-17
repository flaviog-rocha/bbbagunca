'use client'

import Input from "./Input";
import { Roboto } from "next/font/google";
import { getInfoKey } from "@/utils/objectFunctions";
import { crudParticipants, crudTraitInfos } from "@/utils/interfaces";
import { useEffect, useRef, useState } from "react";
import Options from "./Options";
import AreaInput from "./AreaInput";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function CrudParticipant({infos, crudAction, setModal, setCrudParticipants}: crudParticipants){
    const getAllTraits = async () => {
        const res = await fetch('/api/trait')

        const data = await res.json()

        const traits = data.map((trait: crudTraitInfos) => trait.trait)

        setAllTraits(traits)
    }

    const addParticipant = () => {
        setCrudParticipants({
            name, 
            gender,
            age: Number(age),
            profession,
            biografy,
            traits: [{trait: trait1}, {trait: trait2}, {trait: trait3}]
        })
    }

    // const updateReality = () => {
    //     setCrudParticipants({
    //         id_reality: realityId,
    //         name: realityName,
    //         max_power: maxPower,
    //         sec_power: secPower,
    //         danger_zone: dangerZone,
    //         safe_zone: safeZone,
    //     })
    // }

    const saveParticipant = () => {
        let hasError = false;
        setNameError("");
        setTrait1Error("");
        setTrait2Error("");
        setTrait3Error("");

        console.log("Teste")
        if (!name || name === ""){
            console.log(name)
            setNameError("Nome do participante não pode ser vazio!")
            hasError = true;
        }

        if (!allTraits.includes(trait1)){
            console.log("Alo")
            setTrait1Error("Traço não existe na lista!")
            hasError = true;
        }

        if (!allTraits.includes(trait2)){
            setTrait2Error("Traço não existe na lista!")
            hasError = true;
        }
        if (!allTraits.includes(trait3)){
            setTrait3Error("Traço não existe na lista!")
            hasError = true;
        }

        if (trait1 && trait2 && trait3 && (trait1 === trait2 || trait1 === trait3 || trait2 === trait3)){
            setTrait1Error("Traços não podem ser iguais!")
            setTrait2Error("Traços não podem ser iguais!")
            setTrait3Error("Traços não podem ser iguais!")
            hasError = true;
        }

        if (hasError){
            return; 
        }

        if (crudAction === "add"){
            addParticipant()
        }

        // else {
        //     updateReality()
        // }

        setModal(false)
    }
    
    const [participantId, setParticipantId] = useState<number>();
    const [name, setName] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [profession, setProfession] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [eliminationDate, setEliminationDate] = useState<string>("");
    const [trait1, setTrait1] = useState<string>("");
    const [trait2, setTrait2] = useState<string>("");
    const [trait3, setTrait3] = useState<string>("");
    const [trait1Error, setTrait1Error] = useState<string>("");
    const [trait2Error, setTrait2Error] = useState<string>("");
    const [trait3Error, setTrait3Error] = useState<string>("");
    const [biografy, setBiografy] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allTraits, setAllTraits] = useState<string[]>([]);

    useEffect(() => {
        if (infos){
            setParticipantId(Number(getInfoKey(infos, "id_participant")))
            setName(getInfoKey(infos, "name"))
            setGender(getInfoKey(infos, "gender"))
            setAge(getInfoKey(infos, "age"))
            setProfession(getInfoKey(infos, "profession"))
            setStatus(getInfoKey(infos, "status"))
            setEliminationDate(getInfoKey(infos, "elimination_date"))
        }

        getAllTraits()
        setIsLoading(false)
    }, [])

    return (
        <div className="justify-center flex h-2/3">
            <form className="w-full h-2/3" onSubmit={(e) => {
                e.preventDefault()
                saveParticipant()
                }}
            >
                <Input inputName="Nome do(a) participante" id="name" className="p-4 w-full" value={name} changeFunction={setName} error={nameError}/>
                <div className="flex justify-between">
                    <Options 
                        inputName="Traço 1" 
                        id="trait1" 
                        options={allTraits}
                        disabled={[trait1, trait2, trait3]} 
                        className="m-4 w-72" 
                        changeFunction={setTrait1}
                        value={trait1}
                        error={trait1Error}
                    />
                    <Options 
                        inputName="Traço 2" 
                        id="trait2" 
                        options={allTraits}
                        disabled={[trait1, trait2, trait3]} 
                        className="m-4 w-72" 
                        changeFunction={setTrait2}
                        value={trait2}
                        error={trait2Error}
                    />
                    <Options 
                        inputName="Traço 3" 
                        id="trait3" 
                        options={allTraits}
                        disabled={[trait1, trait2, trait3]} 
                        className="m-4 w-72" 
                        changeFunction={setTrait3}
                        value={trait3}
                        error={trait3Error}
                    />
                </div>
                <div className="flex justify-between">
                    <Options 
                        inputName="Sexo" 
                        id="gender" 
                        options={["Masculino", "Feminino", "Outro"]}
                        className="p-4 w-72" 
                        changeFunction={setGender}
                        value={gender}
                    />
                    <Input inputName="Profissão" id="profission" className="p-4 w-96" value={profession} changeFunction={setProfession}/>
                    <Input inputName="Idade" id="age" type="number" className="p-4 w-64" value={age} changeFunction={setAge}/>
                </div>
                <AreaInput inputName="Biografia" id="biografy"  className="p-4 w-full" value={biografy} changeFunction={setBiografy}/>
                <div className="w-full flex justify-end">
                    <button 
                        className={`bg-main-theme-primary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-main-theme-secondary 
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