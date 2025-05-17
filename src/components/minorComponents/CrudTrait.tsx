import { useEffect, useState } from "react";
import Input from "./Input";
import Checkbox from "./Checkbox";
import { Roboto } from "next/font/google";
import { crudTraits } from "@/utils/interfaces";
import { getInfoKey } from "@/utils/objectFunctions";

const robotoBlack = Roboto({
    weight: "900",
    subsets: ["latin"],
})

export default function CrudTrait({infos, crudAction, setModal, setCrudTraits}: crudTraits){
    const [traitId, setTraitId] = useState<number>();
    const [traitName, setTraitName] = useState<string>("");
    const [traitError, setTraitError] = useState<string>("");
    const [hasFemaleVariant, setHasFemaleVariant] = useState<boolean>(false)
    const [femaleVariant, setFemaleVariant] = useState<string>("");

    useEffect(() => {
        if (infos){
            console.log(infos)
            setTraitId(Number(getInfoKey(infos, "id_trait")))
            setTraitName(getInfoKey(infos, "trait"))
            setHasFemaleVariant(getInfoKey(infos, "trait_f") !== "")
            setFemaleVariant(getInfoKey(infos, "trait_f"))
        }
    }, [])

    const addTrait = () => {
        setCrudTraits({
            trait: traitName,
            trait_f: femaleVariant,
        })
    }

    const updateTrait = () => {
        console.log(traitId)

        setCrudTraits({
            id_trait: traitId,
            trait: traitName,
            trait_f: femaleVariant,
        })
    }

    const saveTrait = () => {
        if (!traitName || traitName === ""){
            setTraitError("Traço não pode ser vazio!")
            return;
        }

        if (crudAction === "add"){
            addTrait()
        }

        else {
            updateTrait();
        }

        setModal(false);
    }
    return (
        <div className="justify-center flex">
            <form className="" onSubmit={(e) => {
                e.preventDefault()
                    saveTrait();
                }}
            >
                <Input inputName="Traço" id="trait" className="m-4" value={traitName} changeFunction={setTraitName} error={traitError}/>
                <Checkbox className="ml-4" text="Possui variante feminina?" state={hasFemaleVariant} setState={setHasFemaleVariant}/>
                {
                    hasFemaleVariant &&
                    (<Input className="mx-4 mb-4" inputName="Variante Feminina" value={femaleVariant} changeFunction={setFemaleVariant} id="trait-female"/>)
                }
                <div className="w-full flex justify-end">
                    <button 
                        className={
                            `bg-main-theme-primary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-main-theme-secondary 
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