"use client"

import Table from "@/components/minorComponents/Table";
import { apiReality, realitiesTableData, seasonName } from "@/utils/interfaces";
import { Roboto } from "next/font/google";
import Modal from "@/components/minorComponents/Modal";
import { useState, useEffect } from "react";
import { mdiPen, mdiTrashCan, mdiArrowRight } from "@mdi/js"
import CrudSeason from "@/components/minorComponents/CrudSeason";
import Icon from "@mdi/react"

import { crudReality } from "@/utils/interfaces";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function SeasonsPage({seasonName}: seasonName){
    // API CALLS 
    const getReality = async () => {
        const res = await fetch(`/api/reality/${seasonName}`, {
            method: "GET"
        });
        const data = await res.json();

        setReality(data)
        setPageLoading(false)
    }
    // STATES
    const [pageLoading, setPageLoading] = useState<boolean>(true)
    const [reality, setReality] = useState<apiReality>();
    const [openedModal, setOpenedModal] = useState<boolean>(false);
    const [modalCrudContent, setModalCrudContent] = useState<realitiesTableData[] | ArrayConstructor>([]);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [crudOperation, setCrudOperation] = useState<string>("add");
    const [crudResult, setCrudResult] = useState<crudReality>()
    const [modalCrudIndex, setModalCrudIndex] = useState<number>(-1);
    
    // EFFECTS
    useEffect(() => {
        getReality();
    }, [])

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

    const header: realitiesTableData[] = [
        {
            key: "seasonId",
            name: "Temporada",
            size: 200,
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
            key: "actions",
            name: "Ações",
            size: 150,
        }
    ]

    const data: realitiesTableData[][] = [
        [
            {
                key: "seasonId",
                name: "4",
                textAlign: "center"
            },
            {
                key: "codename",
                name: "Revival",
                textAlign: "center"
            },
            {
                key: "participants",
                name: "32",
                textAlign: "center"
            },
            {
                key: "actions",
                name: actionButton(mdiPen, "Editar reality", () => {
                    setModalTitle("Editar Reality")
                    setModalCrudIndex(0)
                    setCrudOperation("edit")
                }),
                textAlign: "center"
            }
        ],
        [
            {
                key: "seasonId",
                name: "3",
                textAlign: "center"
            },
            {
                key: "participants",
                name: "24",
                textAlign: "center"
            },
            {
                key: "actions",
                name: actionButton(mdiPen, "Editar reality", () => {
                    setModalTitle("Editar Reality")
                    setModalCrudIndex(0)
                    setCrudOperation("edit")
                }),
                textAlign: "center"
            }
        ]

    ]
    
    return (
        <div className="w-full h-full">
            {/* <ToastContainer transition={Slide}/> */}
            {
                openedModal ? (
                    <Modal 
                        title={modalTitle}
                        setModal={setOpenedModal}
                    >
                        {/* <CrudSeason infos={modalCrudContent} crudAction={crudOperation} setModal={setOpenedModal} setCrudReality={setCrudResult}/> */}
                        <CrudSeason infos={modalCrudContent} crudAction={crudOperation} setModal={setOpenedModal} setCrudReality={setCrudResult}/>
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
                        <Table header={header} data={data} isLoading={false}/>
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
                <svg aria-hidden="true" className="w-8 h-8 text-mainThemeDarker animate-spin dark:text-gray-600 fill-mainThemeLighter" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
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