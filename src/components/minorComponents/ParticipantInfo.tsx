import { participantInfoProps } from "@/utils/interfaces"
import { imagesListType } from "@/utils/interfaces"

import Image from "next/image"
import Anjo from "../../../public/img/icons/anjo.png"
import Camarote from "../../../public/img/icons/camarote.png"
import Eliminado from "../../../public/img/icons/eliminado.png"
import Estrela from "../../../public/img/icons/estrela.png"
import Favorito from "../../../public/img/icons/favorito-do-lider.png"
import Imune from "../../../public/img/icons/imune.png"
import Lider from "../../../public/img/icons/lider.png"
import Paredao from "../../../public/img/icons/paredao.png"
import Pipoca from "../../../public/img/icons/pipoca.png"
import Salvo from "../../../public/img/icons/salvo.png"
import Trait from "../../../public/img/icons/trait.png"

export default function ParticipantInfo({infoClass, info}: participantInfoProps){
    const imagesList: imagesListType[] = [
        {
            label: "Camarote",
            image: JSON.parse(JSON.stringify(Camarote))
        },
        {
            label: "Estrela",
            image: JSON.parse(JSON.stringify(Estrela))
        },
        {
            label: "Pipoca",
            image: JSON.parse(JSON.stringify(Pipoca))
        },
        {
            label: "Traço",
            image: JSON.parse(JSON.stringify(Trait))
        },
        {
            label: "Líder",
            image: JSON.parse(JSON.stringify(Lider))
        },
        {
            label: "Anjo",
            image: JSON.parse(JSON.stringify(Anjo))
        },
        {
            label: "Imune",
            image: JSON.parse(JSON.stringify(Imune))
        },
        {
            label: "Favorito do Líder",
            image: JSON.parse(JSON.stringify(Favorito))
        },
        {
            label: "Paredão",
            image: JSON.parse(JSON.stringify(Paredao))
        },
        {
            label: "Salvo",
            image: JSON.parse(JSON.stringify(Salvo))
        },
        {
            label: "Eliminado",
            image: JSON.parse(JSON.stringify(Eliminado))
        },
    ]

    const getObjectImage = (label: string): string => {
        for (const image of imagesList){
            if (label === image.label) return image.image
        }

        return "";
    }

    return (
        <div className="flex">
            <div className="flex items-center">
                <Image 
                    src={getObjectImage(infoClass)} 
                    width={30} 
                    height={30} 
                    alt={`Informações sobre ${info}`}
                />
                <div className="ml-2">
                    { info }
                </div>
            </div> 
        </div>
    )
}