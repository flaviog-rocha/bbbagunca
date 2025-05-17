"use client"

import { Slide, ToastContainer, toast } from "react-toastify"

import Table from "@/components/minorComponents/Table"
import { Roboto } from "next/font/google"
import { useEffect, useState } from "react"
import Modal from "@/components/minorComponents/Modal"
import CrudReality from "@/components/minorComponents/CrudReality"
import { mdiPen, mdiTrashCan, mdiArrowRight } from "@mdi/js"
import Icon from "@mdi/react"
import ConfirmModal from "@/components/minorComponents/ConfirmModal"
import { getInfoKey } from "@/utils/objectFunctions"

import { apiReality, realitiesTableData, crudReality } from "@/utils/interfaces"
import Link from "next/link"

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function RealitiesPage(){
    // API CALLS
    const getRealities = async () => {
        setIsLoading(true);
        const formatedTableData: realitiesTableData[][] = [];
        const res = await fetch("/api/reality", {
            method: "GET"
        });
        const datas = await res.json();

        if (datas.hasOwnProperty("error")){
            toast.error("Erro ao visualizar realities!")
            return;
        }

        datas?.forEach((data: apiReality) => {
            const lineData: realitiesTableData[] = Object.entries(data).map(([key, value]) => ({
                key,
                name: value,
            }))
            
            lineData.push({key: "seasons", name: "1"})
            lineData.push({key: "actions", name: tableActions(Number(getInfoKey(lineData, "id_reality")), getInfoKey(lineData, "name_code")), textAlign: "right"})
            formatedTableData.push(lineData)
        })

        setTableData(formatedTableData)
        setIsLoading(false);
    }

    const addReality = async (reality: crudReality) => {
        const res = await fetch("/api/reality", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: reality.name,
                max_power: reality.max_power,
                sec_power: reality.sec_power,
                danger_zone: reality.danger_zone,
                safe_zone: reality.safe_zone,
            })
        })

        const data = await res.json()

        if (data.hasOwnProperty("error")){
            toast.error("Erro ao adicionar reality!")
            return;
        }

        const lineData: realitiesTableData[] = Object.entries(data).map(([key, value]) => (
            {
                key,
                name: value as string
            }
        ))

        lineData.push({key: "seasons", name: "1"})
        lineData.push({key: "actions", name: tableActions(data.id_reality, data.name_code), textAlign: "right"})
        setTableData([...tableData, lineData])
        toast.success("Reality adicionado com sucesso!")
    }

    const updateReality = async (reality: crudReality) => {
        const res = await fetch("/api/reality", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_reality: reality.id_reality,
                name: reality.name,
                max_power: reality.max_power,
                sec_power: reality.sec_power,
                danger_zone: reality.danger_zone,
                safe_zone: reality.safe_zone,
            })
        })

        const data = await res.json()

        if (data.hasOwnProperty("error")){
            toast.error("Erro ao editar reality!")
            return;
        }

        toast.success("Reality editado com sucesso!")
    }

    const deleteReality = async (idReality: number) => {
        await fetch("/api/reality", {
            method: "DELETE",
            body: JSON.stringify({
                id_reality: idReality,
            })
        });

        toast.success("Reality apagado com sucesso!")
    }

    // STATES
    const [tableData, setTableData] = useState<realitiesTableData[][]>([]);
    const [openedModal, setOpenedModal] = useState<boolean>(false);
    const [openedDeleteModal, setOpenedDeleteModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [crudOperation, setCrudOperation] = useState<string>("add");
    const [modalCrudIndex, setModalCrudIndex] = useState<number>(-1);
    const [modalCrudContent, setModalCrudContent] = useState<realitiesTableData[] | ArrayConstructor>([]);
    const [crudResult, setCrudResult] = useState<crudReality>()
    const [deleteContent, setDeleteContent] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // EFFECTS
    useEffect(() => {
        getRealities()
    }, [])

    useEffect(() => {
        if (modalCrudIndex === -1){
            setModalCrudContent([]);
        }
        if (modalTitle && modalTitle !== ""){
            tableData.forEach((data) => {
                data.forEach((property) => {
                    if(property.key === "id_reality" && Number(property.name) === modalCrudIndex){
                        setModalCrudContent(data);
                        return;
                    }
                })
            })
        }
 
    }, [modalTitle, modalCrudIndex])

    useEffect(() => {
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
        if (!openedModal && !openedDeleteModal){
            setModalCrudIndex(-1)
            setModalTitle("")
        }
        
    }, [openedModal, openedDeleteModal])

    useEffect(() => {
        if (deleteContent){
            deleteReality(Number(getInfoKey(modalCrudContent, "id_reality")));
            setTableData(() => 
                tableData.filter((data) => Number(getInfoKey(modalCrudContent, "id_reality")) !== Number(getInfoKey(data, "id_reality")))
            )
            setDeleteContent(false);
            setOpenedDeleteModal(false);
        }
    }, [deleteContent])

    useEffect(() => {
        if (crudResult){
            if (crudOperation === "add"){
                addReality(crudResult)
            }

            else if (crudOperation === "edit"){
                updateReality(crudResult)
            }
        }
    }, [crudResult])

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

    const linkButton = (icon: string, title: string, newPage: string) => {
        return (
            <Link href={`/admin/reality/${newPage}`}>
                <button 
                    className="px-2"
                    title={title ?? ""}
                    >
                        <Icon path={icon} size={0.8}/>
                </button>
            </Link>
        )
    }

    const tableActions = (index: number, newPage: string) => {
        return (
            <>
                {
                    actionButton(mdiPen, "Editar reality", () => {
                        setModalTitle("Editar Reality")
                        setModalCrudIndex(index)
                        setCrudOperation("edit")
                    })
                }
                {
                    actionButton(mdiTrashCan, "Apagar reality", () => {
                        setModalTitle("Apagar Reality")
                        setModalCrudIndex(index)
                        setCrudOperation("delete")
                    })
                }
                {
                    linkButton(mdiArrowRight, "Ver temporadas do reality", newPage)
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
            size: 150,
        }
    ]

    // FINAL COMPONENT
    return(
        <div className="w-full">
            <ToastContainer transition={Slide}/>
            {
                openedModal ? (
                    <Modal 
                        title={modalTitle}
                        setModal={setOpenedModal}
                    >
                        <CrudReality infos={modalCrudContent} crudAction={crudOperation} setModal={setOpenedModal} setCrudReality={setCrudResult}/>
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
                                        className="bg-purple-theme-lighter p-2 rounded-xl hover:bg-purple-theme-secondary hover:text-zinc-50 mr-6"
                                    >
                                        Cancelar
                                    </button>,

                                    <button 
                                        key="confirmExcludeReality" 
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
            <div className={`w-full bg-purple-theme-tertiary h-12 flex items-center pl-5 text-xl rounded-tr-xl ${robotoBlack.className}`}>Realities</div>
            <div className="flex justify-center mt-12">
                <div>
                    <Table header={header} data={tableData} isLoading={isLoading}/>
                    <div className="text-right">
                        <button 
                            className={`bg-main-theme-primary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-main-theme-secondary transition duration-200 rounded-xl`}
                            onClick={() => {
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