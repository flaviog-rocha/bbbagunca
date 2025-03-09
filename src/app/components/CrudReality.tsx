import Input from "./Input";
import { Roboto } from "next/font/google";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function CrudReality(){
    return (
        <div className="justify-center flex">
            <div className="">
                <Input inputName="Nome do Reality" id="name" className="m-4"/>
                <Input inputName="Poder Máximo" id="max-power" className="m-4"/>
                <Input inputName="Poder Secundário" id="sec-power" className="m-4"/>
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