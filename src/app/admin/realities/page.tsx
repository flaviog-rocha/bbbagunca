"use client"

import Table from "@/app/components/Table"
import { Roboto } from "next/font/google"
import { useState } from "react"
import Modal from "@/app/components/Modal"
import CrudReality from "@/app/components/CrudReality"

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function Realities(){
    const [openedModal, setOpenedModal] = useState(false);
    interface realitiesTableData {
        key: string,
        name: string,
        size?: number,
    }

    const header: realitiesTableData[] = [
        {
            key: "name",
            name: "Nome",
            size: 400,
        },
        {
            key: "seasons",
            name: "Temporadas",
            size: 100,
        },
        {
            key: "actions",
            name: "Ações",
            size: 100,
        }
    ]
    
    const data: realitiesTableData[][] = [
        [
            {key: "name", name: "BBBagunça"}, 
            {key: "seasons", name: "4"},
            {key: "actions", name: "Ações"}
        ],
        [
            {key: "name", name: "A Fazenda da Bagunça"}, 
            {key: "seasons", name: "3"},
            {key: "actions", name: "Ações"}
        ],
        [
            {key: "name", name: "Masterchef da Bagunça"}, 
            {key: "seasons", name: "1"},
            {key: "actions", name: "Ações"}
        ],
        [
            {key: "name", name: "Corrida da Bagunça"}, 
            {key: "seasons", name: "2"},
            {key: "actions", name: "Ações"}
        ],
        [
            {key: "name", name: "Drag Race Bagunça"}, 
            {key: "seasons", name: "0"},
            {key: "actions", name: "Ações"}
        ],
        [
            {key: "name", name: "The Voice Bagunça"}, 
            {key: "seasons", name: "0"},
            {key: "actions", name: "Ações"}
        ]
    ]
    return(
        <div className="w-full">
            {
                openedModal ? (
                    <Modal 
                        title="Ablublé"
                        setModal={setOpenedModal}
                    >
                        <CrudReality/>
                    </Modal>
                ) : <></>
            }
            <div className={`w-full bg-purpleThemeTertiary h-12 flex items-center pl-5 text-xl rounded-tr-xl ${robotoBlack.className}`}>Realities</div>
            <div className="flex justify-center mt-12">
                <div>
                    <Table header={header} data={data}/>
                    <div className="text-right">
                        <button 
                            className={`bg-mainThemePrimary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-mainThemeSecondary transition duration-200 rounded-xl`}
                            onClick={() => {
                                    setOpenedModal(true)
                                }
                            }
                        >
                                Adicionar novo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}