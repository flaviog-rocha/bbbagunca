"use client"

import { Slide, ToastContainer, toast } from "react-toastify"

import Table from "@/components/minorComponents/Table";
import { apiReality, crudSeason, crudSeasonInfos, realitiesTableData, realityName } from "@/utils/interfaces";
import { Roboto } from "next/font/google";
import Modal from "@/components/minorComponents/Modal";
import { useState, useEffect } from "react";
import { mdiPen, mdiCheckCircle, mdiCloseCircle, mdiTrashCan, mdiArrowRight } from "@mdi/js"
import ConfirmModal from "@/components/minorComponents/ConfirmModal"
import CrudSeason from "@/components/minorComponents/CrudSeason";
import Icon from "@mdi/react"
import LoadingIcon from "@/components/minorComponents/LoadingIcon";
import { getInfoKey } from "@/utils/objectFunctions";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function SeasonsPage({index}: realityName){
    // API CALLS 
    const getReality = async () => {
        const res = await fetch(`/api/reality/${index}`, {
            method: "GET"
        });
        const data = await res.json();

        if (!data){
            toast.error("Reality não encontrado!")
            return;
        }

        setReality(data)
        getSeasons();
    }

    const getSeasons = async () => {
        const formatedTableData: realitiesTableData[][] = [];
        const res = await fetch(`/api/reality/${index}/seasons`)

        const datas = await res.json();

        if (datas.hasOwnProperty("error")){
            toast.error("Erro ao visualizar temporadas!")
            return;
        }

        setPageLoading(false)

        datas?.forEach((data: crudSeasonInfos) => {
            const lineData: realitiesTableData[] = Object.entries(data).map(([key, value]) => ({
                key,
                name: value as string,
                textAlign: "center"
            }))
            
            lineData.push({key: "currentSeason", name: currentSymbol(data.current)})
            // lineData.push({key: "seasons", name: "1"})
            lineData.push({key: "actions", name: tableActions(Number(getInfoKey(lineData, "id_season")), getInfoKey(lineData, "name_code")), textAlign: "right"})
            formatedTableData.push(lineData)
        })

        setTableData(formatedTableData)
    }

    const addSeason = async (season: crudSeasonInfos) => {
        const res = await fetch(`/api/reality/${index}/seasons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                season_number: season.season_number,
                codename: season.codename,
                current: season.current,
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
                name: value as string,
                textAlign: 'center',
            }
        ))

        lineData.push({key: "currentSeason", name: currentSymbol(data.current)})
        // lineData.push({key: "seasons", name: "1"})
        // lineData.push({key: "actions", name: tableActions(data.id_reality, data.name_code)})
        setTableData([...tableData, lineData])
        toast.success("Reality adicionado com sucesso!")
    }

    const updateSeason = async (season: crudSeasonInfos) => {
        const res = await fetch(`/api/reality/${index}/seasons`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_season: season.id_season,
                season_number: season.season_number,
                codename: season.codename,
                current: season.current,
            })
        })

        const data = await res.json()

        if (data.hasOwnProperty("error")){
            toast.error("Erro ao atualizar reality!")
            return;
        }

        // const lineData: realitiesTableData[] = Object.entries(data).map(([key, value]) => (
        //     {
        //         key,
        //         name: value as string,
        //         textAlign: 'center',
        //     }
        // ))

        // lineData.push({key: "currentSeason", name: currentSymbol(data.current)})
        // lineData.push({key: "seasons", name: "1"})
        // lineData.push({key: "actions", name: tableActions(data.id_reality, data.name_code)})
        // setTableData([...tableData, lineData])
        toast.success("Reality atualizado com sucesso!")
    }

    const deleteReality = async (idSeason: number) => {
        await fetch(`/api/reality/${index}/seasons`, {
            method: "DELETE",
            body: JSON.stringify({
                id_season: idSeason,
            })
        });

        toast.success("Reality apagado com sucesso!")
    }

    // STATES
    const [tableData, setTableData] = useState<realitiesTableData[][]>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(true)
    const [reality, setReality] = useState<apiReality>();
    const [openedModal, setOpenedModal] = useState<boolean>(false);
    const [modalCrudContent, setModalCrudContent] = useState<realitiesTableData[] | ArrayConstructor>([]);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [crudOperation, setCrudOperation] = useState<string>("add");
    const [crudResult, setCrudResult] = useState<crudSeasonInfos>()
    const [modalCrudIndex, setModalCrudIndex] = useState<number>(-1);
    const [deleteContent, setDeleteContent] = useState<boolean>(false);
    const [openedDeleteModal, setOpenedDeleteModal] = useState<boolean>(false);
    
    // EFFECTS
    useEffect(() => {
        getReality();
    }, [])

    useEffect(() => {
        if (modalCrudIndex === -1){
            setModalCrudContent([]);
        }
        if (modalTitle && modalTitle !== ""){
            console.log(`ModalCrudIndex: ${modalCrudIndex}`)
            tableData.forEach((data) => {
                data.forEach((property) => {
                    if(property.key === "id_season" && Number(property.name) === modalCrudIndex){
                        setModalCrudContent(data);
                        return;
                    }
                })
            })
        }
 
    }, [modalTitle, modalCrudIndex])

    useEffect(() => {
        if (crudResult){
            if (crudOperation === "add"){
                addSeason(crudResult)
            }

            else if (crudOperation === "edit"){
                updateSeason(crudResult)
            }
        }
    }, [crudResult])

    useEffect(() => {
        console.log("Modal Crud Content:")
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
            deleteReality(Number(getInfoKey(modalCrudContent, "id_season")));
            setTableData(() => 
                tableData.filter((data) => Number(getInfoKey(modalCrudContent, "id_season")) !== Number(getInfoKey(data, "id_season")))
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

    const currentSymbol = (current: boolean) => {
        return (
            <div className="flex justify-center">
                {          
                    current ? <Icon path={mdiCheckCircle} size={1.2} className="text-green-700"></Icon> : <Icon path={mdiCloseCircle} className="text-red-700" size={1.2}></Icon>
                }
            </div>
        )
    }

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

    const tableActions = (index: number, newPage: string) => {
        return (
            <>
                {
                    actionButton(mdiPen, "Editar temporada", () => {
                        setModalTitle("Editar temporada")
                        setModalCrudIndex(index)
                        setCrudOperation("edit")
                    })
                }
                {
                    actionButton(mdiTrashCan, "Apagar temporada", () => {
                        setModalTitle("Apagar temporada")
                        setModalCrudIndex(index)
                        setCrudOperation("delete")
                    })
                }
                {/* {
                    linkButton(mdiArrowRight, "Ver temporadas do reality", newPage)
                } */}
            </>
        )
    }

    const header: realitiesTableData[] = [
        {
            key: "season_number",
            name: "Temporada",
            size: 100,
        },
        {
            key: "codename",
            name: "Codinome",
            size: 300,
        },
        {
            key: "participants",
            name: "Participantes",
            size: 100,
        },
        {
            key: "currentSeason",
            name: "Em andamento",
            size: 100,
        },
        {
            key: "actions",
            name: "Ações",
            size: 150,
        }
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
                        {/* <CrudSeason infos={modalCrudContent} crudAction={crudOperation} setModal={setOpenedModal} setCrudReality={setCrudResult}/> */}
                        <CrudSeason infos={modalCrudContent} crudAction={crudOperation} setModal={setOpenedModal} setCrudSeason={setCrudResult}/>
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
                                        key="cancelExcludeReality" 
                                        className="bg-purpleThemeLighter p-2 rounded-xl hover:bg-purpleThemeSecondary hover:text-zinc-50 mr-6"
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
            {!pageLoading ? (<>
                <div className={`w-full bg-purpleThemeTertiary h-12 flex items-center pl-5 text-xl rounded-tr-xl ${robotoBlack.className}`}>Temporadas de {reality?.name}</div>
                <div className="flex justify-center mt-12">
                    <div>
                        <Table header={header} data={tableData}/>
                        <div className="text-right">
                            <button 
                                className={`bg-mainThemePrimary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-mainThemeSecondary transition duration-200 rounded-xl`}
                                onClick={() => {
                                        setModalTitle("Adicionar Temporada")
                                        setCrudOperation("add")
                                    }
                                }
                            >
                                    Adicionar nova
                            </button>
                        </div>
                    </div>
                </div>
            </>) 
            : 
            <div className="h-full flex justify-center items-center">
                <LoadingIcon/>
            </div>
            }
        </div>
    )
}