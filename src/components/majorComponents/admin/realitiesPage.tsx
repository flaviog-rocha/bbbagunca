"use client"

import Table from "@/components/minorComponents/Table"
import { Roboto } from "next/font/google"
import { JSX, useState } from "react"
import Modal from "@/components/minorComponents/Modal"
import CrudReality from "@/components/minorComponents/CrudReality"
import { mdiPen, mdiTrashCan } from "@mdi/js"
import Icon from "@mdi/react"
import ConfirmModal from "@/components/minorComponents/ConfirmModal"
import { getInfoKey } from "@/utils/objectFunctions"

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function RealitiesPage(){
    const [openedModal, setOpenedModal] = useState<boolean>(false);
    const [openedDeleteModal, setOpenedDeleteModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalCrudContent, setModalCrudContent] = useState<realitiesTableData[] | ArrayConstructor>([]);
    interface realitiesTableData {
        key: string,
        name: string | JSX.Element,
        size?: number,
        textAlign?: string,
    }

    const actionButton = (icon: string, action: (() => void)) => {
        return (
            <button 
                className="px-2"
                onClick={() => action()}
                >
                    <Icon path={icon} size={0.8}/>
            </button>
        )
    }

    const tableActions = (index: number) => {
        return (
            <>
                {
                    actionButton(mdiPen, () => {
                        setModalTitle("Editar Reality")
                        setOpenedModal(true)
                        setModalCrudContent(data[index])
                    })
                }
                {
                    actionButton(mdiTrashCan, () => {
                        setModalTitle("Apagar Reality")
                        setOpenedDeleteModal(true)
                        setModalCrudContent(data[index])
                    })
                }
            </>
        )
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
            {key: "max-power", name: "Líder"},
            {key: "sec-power", name: "Anjo"},
            {key: "danger-zone", name: "Paredão"},
            {key: "safe-zone", name: "Imunidade"},
            {key: "actions", name: tableActions(0), textAlign: "right"}
        ],
        [
            {key: "name", name: "A Fazenda da Bagunça"}, 
            {key: "seasons", name: "3"},
            {key: "max-power", name: "Fazendeiro"},
            {key: "sec-power", name: "Poder do Cristal"},
            {key: "safe-zone", name: "Imunidade"},
            {key: "danger-zone", name: "Roça"},
            {key: "actions", name: tableActions(1), textAlign: "right"}
        ],
        [
            {key: "name", name: "Masterchef da Bagunça"}, 
            {key: "seasons", name: "1"},
            {key: "safe-zone", name: "Mezanino"},
            {key: "danger-zone", name: "Prova de Eliminação"},
            {key: "actions", name: tableActions(2), textAlign: "right"}
        ],
        [
            {key: "name", name: "Corrida da Bagunça"}, 
            {key: "seasons", name: "2"},
            {key: "danger-zone", name: "Flop"},
            {key: "actions", name: tableActions(3), textAlign: "right"}
        ],
        [
            {key: "name", name: "Drag Race Bagunça"}, 
            {key: "seasons", name: "0"},
            {key: "actions", name: tableActions(4), textAlign: "right"}
        ],
        [
            {key: "name", name: "The Voice Bagunça"}, 
            {key: "seasons", name: "0"},
            {key: "actions", name: tableActions(5), textAlign: "right"}
        ]
    ]
    return(
        <div className="w-full">
            {
                openedModal ? (
                    <Modal 
                        title={modalTitle}
                        setModal={setOpenedModal}
                    >
                        <CrudReality infos={modalCrudContent}/>
                    </Modal>
                ) : <></>
            }
                        {
                openedDeleteModal ? (
                    <Modal 
                        title={modalTitle}
                        setModal={setOpenedDeleteModal}
                    >
                        <ConfirmModal 
                            message={`Deseja apagar o reality ${getInfoKey(modalCrudContent, "name")} permanentemente?`}
                            buttons={
                                [
                                    <button 
                                        key="cancelExcludeReality" 
                                        className="bg-purpleThemeLighter p-2 rounded-xl hover:bg-purpleThemeSecondary hover:text-zinc-50 mr-6"
                                    >
                                        Cancelar
                                    </button>,

                                    <button 
                                        key="confirmExcludeReality" 
                                        className="bg-red-400 p-2 rounded-xl hover:bg-red-600 hover:text-zinc-50"
                                    >
                                        Apagar
                                    </button>
                                ]
                            }
                        />
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
                                    setModalCrudContent(Array(0))
                                    setModalTitle("Adicionar Reality")
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