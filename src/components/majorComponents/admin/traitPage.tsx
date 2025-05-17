"use client"

import { Slide, ToastContainer, toast } from "react-toastify"

import { Roboto } from "next/font/google"
import { useState, useEffect } from "react";

import Table from "@/components/minorComponents/Table"
import Modal from "@/components/minorComponents/Modal";
import CrudTrait from "@/components/minorComponents/CrudTrait";
import ConfirmModal from "@/components/minorComponents/ConfirmModal";
import { getInfoKey } from "@/utils/objectFunctions";
import { crudTraitInfos, realitiesTableData } from "@/utils/interfaces";

import Icon from "@mdi/react";
import { mdiPen, mdiTrashCan } from "@mdi/js";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function TraitPage(){
    // API CALLS
        const getTrait = async () => {
            setIsLoading(true);
            const formatedTableData: realitiesTableData[][] = [];
            const res = await fetch("/api/trait", {
                method: "GET"
            });
            const datas = await res.json();
    
            if (datas.hasOwnProperty("error")){
                toast.error("Erro ao visualizar temporadas!")
                return;
            }
    
            datas?.forEach((data: crudTraitInfos) => {
                const lineData: realitiesTableData[] = Object.entries(data).map(([key, value]) => ({
                    key,
                    name: value,
                    textAlign: "center",
                }))
                
                lineData.push({key: "actions", name: tableActions(Number(getInfoKey(lineData, "id_trait"))), textAlign: "right"})
                formatedTableData.push(lineData)
            })
    
            setTableData(formatedTableData)
            setIsLoading(false);
        }

    const addTrait = async (traitInfo: crudTraitInfos) => {
        const res = await fetch("/api/trait", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                trait: traitInfo.trait,
                trait_f: traitInfo.trait_f
            })
        })

        const data = await res.json()

        if (data.hasOwnProperty("error")){
            toast.error("Erro ao adicionar traço!")
            return;
        }

        const lineData: realitiesTableData[] = Object.entries(data).map(([key, value]) => (
            {
                key,
                name: value as string,
                textAlign: 'center',
            }
        ))
        
        // lineData.push({key: "currentSeason", name: currentSymbol(data.current)})
        // // lineData.push({key: "seasons", name: "1"})
        lineData.push({key: "actions", name: tableActions(data.id_trait)})
        setTableData([...tableData, lineData])
        toast.success("Traço adicionado com sucesso!")
    }

    const updateTrait = async (traitInfo: crudTraitInfos) => {
        console.log(`traitInfo: ${JSON.stringify(traitInfo)}`)

        const res = await fetch("/api/trait", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_trait: traitInfo.id_trait,
                trait: traitInfo.trait,
                trait_f: traitInfo.trait_f
            })
        })

        const data = await res.json()

        if (data.hasOwnProperty("error")){
            toast.error("Erro ao editar traço!")
            return;
        }

        toast.success("Traço editado com sucesso!")
    }

    const deleteTrait = async (idTrait: number) => {
        await fetch("/api/trait", {
            method: "DELETE",
            body: JSON.stringify({
                id_trait: idTrait,
            })
        });

        toast.success("Traço apagado com sucesso!")
    }

    // STATES
    const [tableData, setTableData] = useState<realitiesTableData[][]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openedModal, setOpenedModal] = useState<boolean>(false);
    const [modalCrudContent, setModalCrudContent] = useState<realitiesTableData[] | ArrayConstructor>([]);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [crudOperation, setCrudOperation] = useState<string>("add");
    const [crudResult, setCrudResult] = useState<crudTraitInfos>()
    const [modalCrudIndex, setModalCrudIndex] = useState<number>(-1);
    const [deleteContent, setDeleteContent] = useState<boolean>(false);
    const [openedDeleteModal, setOpenedDeleteModal] = useState<boolean>(false);
    
    // EFFECTS
    useEffect(() => {
        getTrait();
    }, [])

    useEffect(() => {
        if (modalCrudIndex === -1){
            setModalCrudContent([]);
        }
        if (modalTitle && modalTitle !== ""){
            for (const data of tableData){
                console.log(data)
                for (const property of data){
                    console.log(property)
                    if(property.key === "id_trait" && Number(property.name) === modalCrudIndex){
                        setModalCrudContent(data);
                        return;
                    }
                }
            }
            // tableData.forEach((data) => {
            //     console.log(data)
            //     console.log(modalCrudIndex)
            //     data.forEach((property) => {
            //         console.log(property)
            //         console.log(Number(property.name))
            //         if(property.key === "id_trait" && Number(property.name) === modalCrudIndex){
            //             console.log("Aqui!")
            //             setModalCrudContent(data);
            //             return;
            //         }
            //         console.log("????????")
            //     })
            // })
        }
    
    }, [modalTitle, modalCrudIndex])

    useEffect(() => {
        if (crudResult){
            if (crudOperation === "add"){
                addTrait(crudResult)
            }

            else if (crudOperation === "edit"){
                updateTrait(crudResult)
            }
        }
    }, [crudResult])

    useEffect(() => {
        console.log(modalCrudContent)
        if (modalTitle && modalTitle !== ""){
            if (crudOperation === "add" || crudOperation === "edit"){
                setOpenedModal(true)
            }
            else {
                setOpenedDeleteModal(true)
            }
        }
        
    }, [modalCrudContent, modalTitle, crudOperation])

    useEffect(() => {
        if (deleteContent){
            deleteTrait(Number(getInfoKey(modalCrudContent, "id_trait")));
            setTableData(() => 
                tableData.filter((data) => Number(getInfoKey(modalCrudContent, "id_trait")) !== Number(getInfoKey(data, "id_trait")))
            )
            setDeleteContent(false);
            setOpenedDeleteModal(false);
        }
    }, [deleteContent])

    useEffect(() => {
        if (!openedModal && !openedDeleteModal){
            setModalCrudIndex(-1)
            setModalTitle("")
        }
        
    }, [openedModal, openedDeleteModal])

    // OTHER FUNCTIONS
    const actionButton = (icon: string, title: string, action: (() => void)) => {
        return (
            <button 
                className="px-2"
                onClick={() => action()}
                title={title ?? ""}
                >
                    <Icon path={icon} size={0.8}/>
            </button>
        )
    }

    const tableActions = (index: number) => {
        return (
            <>
                {
                    actionButton(mdiPen, "Editar traço", () => {
                        console.log(`Index: ${index}`)
                        setModalTitle("Editar Traço")
                        setModalCrudIndex(index)
                        setCrudOperation("edit")
                    })
                }
                {
                    actionButton(mdiTrashCan, "Apagar traço", () => {
                        setModalTitle("Apagar Traço")
                        setModalCrudIndex(index)
                        setCrudOperation("delete")
                    })
                }
            </>
        )
    }

    const header: realitiesTableData[] = [
        {
            key: "trait",
            name: "Traço",
            size: 600,
        },
        {
            key: "actions",
            name: "Ações"
        },
    ]

    return (
        <div className="w-full h-full">
            <ToastContainer transition={Slide}/>
            {
                openedModal ? (
                    <Modal 
                        title={modalTitle}
                        setModal={setOpenedModal}
                    >
                        <CrudTrait infos={modalCrudContent} crudAction={crudOperation} setModal={setOpenedModal} setCrudTraits={setCrudResult}/>
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
                            message={`Deseja apagar a temporada ${getInfoKey(modalCrudContent, "season_number")} permanentemente?`}
                            buttons={
                                [
                                    <button 
                                        key="cancelExcludeTrait" 
                                        className="bg-purple-theme-lighter p-2 rounded-xl hover:bg-purple-theme-secondary hover:text-zinc-50 mr-6"
                                    >
                                        Cancelar
                                    </button>,

                                    <button 
                                        key="confirmExcludeTrait" 
                                        className="bg-red-400 p-2 rounded-xl hover:bg-red-600 hover:text-zinc-50"
                                        onClick={() => {
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
            {/* {!pageLoading ? ( */}
                <>
                    <div className={`w-full bg-purple-theme-tertiary h-12 flex items-center pl-5 text-xl rounded-tr-xl ${robotoBlack.className}`}>Traços</div>
                    <div className="flex justify-center mt-12 h-full">
                        <div>
                            <Table header={header} data={tableData} isLoading={isLoading}/>
                            <div className="text-right">
                                <button 
                                    className={`bg-main-theme-primary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-main-theme-secondary transition duration-200 rounded-xl`}
                                    onClick={() => {
                                            setModalTitle("Adicionar Traço")
                                            setCrudOperation("add")
                                        }
                                    }
                                >
                                        Adicionar nova
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            </div>
    )
}