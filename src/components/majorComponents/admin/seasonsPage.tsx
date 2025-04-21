"use client"

import { Slide, ToastContainer, toast } from "react-toastify"

import Table from "@/components/minorComponents/Table";
import { apiReality, crudSeason, crudSeasonInfos, realitiesTableData, realityName } from "@/utils/interfaces";
import { Roboto } from "next/font/google";
import Modal from "@/components/minorComponents/Modal";
import { useState, useEffect } from "react";
import { mdiPen, mdiCheckCircle, mdiCloseCircle, mdiTrashCan, mdiArrowRight } from "@mdi/js"
import CrudSeason from "@/components/minorComponents/CrudSeason";
import Icon from "@mdi/react"
import LoadingIcon from "@/components/minorComponents/LoadingIcon";

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
            
            lineData.push({key: "currentSeason", name: currentSymbol(false)})
            console.log(lineData)
            // lineData.push({key: "seasons", name: "1"})
            // lineData.push({key: "actions", name: tableActions(Number(getInfoKey(lineData, "id_reality")), getInfoKey(lineData, "name_code")), textAlign: "right"})
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
                codiname: season.codiname,
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
            }
        ))

        // lineData.push({key: "seasons", name: "1"})
        // lineData.push({key: "actions", name: tableActions(data.id_reality, data.name_code)})
        // setTableData([...tableData, lineData])
        toast.success("Reality adicionado com sucesso!")
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
    
    // EFFECTS
    useEffect(() => {
        getReality();
    }, [])

    useEffect(() => {
        if (crudResult){
            if (crudOperation === "add"){
                addSeason(crudResult)
            }

            // else if (crudOperation === "edit"){
            //     updateReality(crudResult)
            // }
        }
    }, [crudResult])

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
                {/* {
                    actionButton(mdiTrashCan, "Apagar reality", () => {
                        setModalTitle("Apagar Reality")
                        setModalCrudIndex(index)
                        setCrudOperation("delete")
                    })
                } */}
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

    // const data: realitiesTableData[][] = [
    //     [
    //         {
    //             key: "season_number",
    //             name: "4",
    //             textAlign: "center"
    //         },
    //         {
    //             key: "codename",
    //             name: "Revival",
    //             textAlign: "center"
    //         },
    //         {
    //             key: "participants",
    //             name: "32",
    //             textAlign: "center"
    //         },
    //         {
    //             key: "actions",
    //             name: actionButton(mdiPen, "Editar reality", () => {
    //                 setModalTitle("Editar Reality")
    //                 setModalCrudIndex(0)
    //                 setCrudOperation("edit")
    //             }),
    //             textAlign: "center"
    //         }
    //     ],
    //     [
    //         {
    //             key: "season_number",
    //             name: "3",
    //             textAlign: "center"
    //         },
    //         {
    //             key: "participants",
    //             name: "24",
    //             textAlign: "center"
    //         },
    //         {
    //             key: "actions",
    //             name: actionButton(mdiPen, "Editar reality", () => {
    //                 setModalTitle("Editar Reality")
    //                 setModalCrudIndex(0)
    //                 setCrudOperation("edit")
    //             }),
    //             textAlign: "center"
    //         }
    //     ]

    // ]
    
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
            {/* {
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
            } */}
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
                                        setOpenedModal(true)
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
        // <>
        //     <div>
        //         <Table header={header} data={data} isLoading={false}/>
        //     </div>
        // </>
    )
}