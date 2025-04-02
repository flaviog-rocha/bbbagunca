"use client"

import Table from "@/components/minorComponents/Table"
import { Roboto } from "next/font/google"
import { useEffect, useState } from "react"
import Modal from "@/components/minorComponents/Modal"
import CrudReality from "@/components/minorComponents/CrudReality"
import { mdiPen, mdiTrashCan } from "@mdi/js"
import Icon from "@mdi/react"
import ConfirmModal from "@/components/minorComponents/ConfirmModal"
import { getInfoKey } from "@/utils/objectFunctions"

import { apiReality, realitiesTableData } from "@/utils/interfaces"

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function RealitiesPage(){
    const [tableData, setTableData] = useState<realitiesTableData[][]>([]);
    const [openedModal, setOpenedModal] = useState<boolean>(false);
    const [openedDeleteModal, setOpenedDeleteModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [crudOperation, setCrudOperation] = useState<string>("add");
    const [modalCrudIndex, setModalCrudIndex] = useState<number>(-1);
    const [modalCrudContent, setModalCrudContent] = useState<realitiesTableData[] | ArrayConstructor>([]);
    const [deleteContent, setDeleteContent] = useState<boolean>(false);

    useEffect(() => {
        getRealities()
    }, [])

    useEffect(() => {
        console.log("Teste 1")
        if (modalTitle && modalTitle !== ""){
            console.log ("If Teste 1")
            setModalCrudContent(tableData[modalCrudIndex])
        }
 
    }, [tableData, modalCrudIndex, modalTitle, crudOperation])

    useEffect(() => {
        console.log("Teste 2")
        if (modalTitle && modalTitle !== ""){
            console.log ("If Teste 2")
            if (crudOperation === "add" || crudOperation === "edit"){
                setOpenedModal(true)
            }
            else {
                setOpenedDeleteModal(true)
            }
        }
        
    }, [modalCrudContent, modalTitle, crudOperation])

    useEffect(() => {
        console.log("Teste 3")
        if (!openedModal){
            setModalCrudIndex(-1)
            setModalTitle("")
        }
        
    }, [openedModal])

    useEffect(() => {
        console.log(modalCrudContent)
        if (deleteContent){
            deleteReality(Number(getInfoKey(modalCrudContent, "id_reality")));
            setDeleteContent(false);
        }
    }, [deleteContent])

    const getRealities = async () => {
        const formatedTableData: realitiesTableData[][] = [];
        const res = await fetch("/api/reality", {
            method: "GET"
        });
        const datas = await res.json();

        datas?.forEach((data: apiReality, index: number) => {
            console.log(index)
            const lineData: realitiesTableData[] = Object.entries(data).map(([key, value]) => ({
                key,
                name: value,
            }))
            
            lineData.push({key: "seasons", name: "1"})
            lineData.push({key: "actions", name: tableActions(index), textAlign: "right"})
            formatedTableData.push(lineData)
        })

        setTableData(formatedTableData)
        // console.log(datas)
    }

    const deleteReality = async (idReality: number) => {
        await fetch("/api/reality", {
            method: "DELETE",
            body: JSON.stringify({
                id_reality: idReality,
            })
        });
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
                        console.log(`Index: ${index}`)
                        console.log(tableData)
                        console.log(tableData[index])
                        setModalTitle("Editar Reality")
                        setModalCrudIndex(index)
                        setCrudOperation("edit")
                    })
                }
                {
                    actionButton(mdiTrashCan, () => {
                        setModalTitle("Apagar Reality")
                        setModalCrudIndex(index)
                        setCrudOperation("delete")
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

    return(
        <div className="w-full">
            {
                openedModal ? (
                    <Modal 
                        title={modalTitle}
                        setModal={setOpenedModal}
                    >
                        <CrudReality infos={modalCrudContent} crudAction={crudOperation} setModal={setOpenedModal}/>
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
                                        onClick={() => {
                                            console.log("=====CLICOU NO BOTÃO!!!======")
                                            setDeleteContent(true)
                                        }}
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
                    <Table header={header} data={tableData}/>
                    <div className="text-right">
                        <button 
                            className={`bg-mainThemePrimary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-mainThemeSecondary transition duration-200 rounded-xl`}
                            onClick={() => {
                                    // setModalCrudContent(Array(0))
                                    setModalTitle("Adicionar Reality")
                                    setCrudOperation("add")
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