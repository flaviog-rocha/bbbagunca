import Input from "./Input";
import { Roboto } from "next/font/google";
import { getInfoKey } from "@/utils/objectFunctions";
import { infosInterface } from "@/utils/interfaces";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function CrudReality({infos}: infosInterface){
    return (
        <div className="justify-center flex">
            <div className="">
                <Input inputName="Nome do Reality" id="name" className="m-4" value={infos ? getInfoKey(infos, "name") : ""}/>
                <Input inputName="Poder Máximo" id="max-power" className="m-4" value={infos ? getInfoKey(infos, "max-power") : ""}/>
                <Input inputName="Poder Secundário" id="sec-power" className="m-4" value={infos ? getInfoKey(infos, "sec-power") : ""}/>
                <Input inputName="Risco de Eliminação" id="danger-zone" className="m-4" value={infos ? getInfoKey(infos, "danger-zone") : ""}/>
                <Input inputName="Salvação" id="safe-zone" className="m-4" value={infos ? getInfoKey(infos, "safe-zone") : ""}/>
                <div className="w-full flex justify-end">
                    <button 
                        className={`bg-mainThemePrimary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-mainThemeSecondary 
                                    transition duration-200 rounded-xl m-4`
                                }
                        >
                            Salvar
                        </button>
                </div>
            </div>
        </div>
    )
}