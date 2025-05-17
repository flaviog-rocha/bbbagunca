"use client"

import { Slide, ToastContainer, toast } from "react-toastify"

import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";

import { apiReality, castInfo, crudSeasonInfos, realitiesTableData, crudParticipantsInfos } from "@/utils/interfaces";
import LoadingIcon from "@/components/minorComponents/LoadingIcon"
import Table from "@/components/minorComponents/Table";
import Image, { StaticImageData } from "next/image";
import { mdiCrown, mdiCloud, mdiWall, mdiShield } from "@mdi/js";

import Modal from "@/components/minorComponents/Modal";
import CrudParticipant from "@/components/minorComponents/CrudParticipant";

import Camila from "../../../../public/img/portraits/Camila.png"
import Weslei from "../../../../public/img/portraits/Weslei.png"
import Afrodite from "../../../../public/img/portraits/Afrodite.png"
import Mariana from "../../../../public/img/portraits/Mariana.png"
import Flavio from "../../../../public/img/portraits/Flávio.png"
import Joao from "../../../../public/img/portraits/João Lucas.png"
import Gisele from "../../../../public/img/portraits/Gisele.png"
import Lorena from "../../../../public/img/portraits/Lorena.png"

import Icon from "@mdi/react";

const robotoBlack = Roboto({
    weight: "900",
    subsets: ["latin"],
  })

export default function CastPage({realityName, seasonNumber}: castInfo){
    const getReality = async () => {
        const res = await fetch(`/api/reality/${realityName}`, {
            method: "GET"
        });
        const data = await res.json();

        if (!data){
            toast.error("Reality não encontrado!")
            return;
        }

        setReality(data)
        getSeason();
    }

    const getSeason = async () => {
        // const formatedTableData: realitiesTableData[][] = [];
        const res = await fetch(`/api/reality/${realityName}/${seasonNumber}`)

        const data = await res.json();

        if (data.hasOwnProperty("error")){
            toast.error("Erro ao visualizar temporada!")
            return;
        }

        setSeason(data)

        setPageLoading(false)
    }

    const addParticipant = async (participant: crudParticipantsInfos) => {
        console.log(participant)
        const res = await fetch(`/api/reality/${realityName}/${seasonNumber}/participants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                participant
            })
        })

        const data = await res.json()

        if (data.hasOwnProperty("error")){
            toast.error("Erro ao adicionar participante!")
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
        toast.success("Participante adicionado(a) com sucesso!")
    }

    const [pageLoading, setPageLoading] = useState<boolean>(true)
    const [reality, setReality] = useState<apiReality>();
    const [openedModal, setOpenedModal] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalCrudContent, setModalCrudContent] = useState<realitiesTableData[] | ArrayConstructor>([]);
    const [crudOperation, setCrudOperation] = useState<string>("add");
    const [crudResult, setCrudResult] = useState<crudParticipantsInfos>()
    const [season, setSeason] = useState<crudSeasonInfos>();

    useEffect(() => {
        getReality();
    }, [])

    useEffect(() => {
        if (modalTitle && modalTitle !== ""){
            if (crudOperation === "add" || crudOperation === "edit"){
                setOpenedModal(true)
            }
            // else {
            //     setOpenedDeleteModal(true)
            // }
        }
        
    }, [modalCrudContent, modalTitle, crudOperation])

    useEffect(() => {
        if (crudResult){
            if (crudOperation === "add"){
                console.log(crudResult)
                addParticipant(crudResult)
            }

            // else if (crudOperation === "edit"){
            //     updateSeason(crudResult)
            // }
        }
    }, [crudResult])

    const participantImage = (image: StaticImageData, name: string, eliminated: boolean) => {
        return (
            <Image 
                title={`${name}`} 
                alt={`Imagem da participante ${name}`} 
                src={image} width={60} 
                className={`bg-indigo-100 rounded-full ${eliminated && 'grayscale'} select-none hover:bg-main-theme-lighter animation duration-200`}/> 
        )
    }

    const statusWithIcon = (status: string) => {
        let icon = "";
        let iconColor = "";

        switch (status){
            case "Líder":
                icon = mdiCrown;
                iconColor = "text-yellow-600";

                break;

            case "Anjo":
                icon = mdiCloud;
                iconColor = "text-blue-500";
                break;

            case "Paredão":
                icon = mdiWall;
                iconColor = "text-orange-600";
                break;
            
            case "Imune":
                icon = mdiShield;
                iconColor = "text-green-600";
                break;

            case "Eliminado":
                iconColor = "text-red-600";
                break;
        }

        return (
            <div className={`flex items-center justify-center ${iconColor}`}>
                {(icon || icon !== "") && (<Icon path={icon} size={1} className="mr-2"/>)}<div>{status}</div>
            </div>
        )
    }

    const header: realitiesTableData[] = [
        {
            key: "image",
            name: "",
            size: 85,
        },
        {
            key: "name",
            name: "Nome",
            size: 200,
        },
        {
            key: "status",
            name: "Status",
            size: 200,
        },
        {
            key: "placing",
            name: "Colocação",
            size: 200,
        },
        {
            key: "actions",
            name: "Ações"
        },
    ]

    const data: realitiesTableData[][] = [
        [
            {
                key: "image",
                name: participantImage(Mariana, "Mariana", false),
            },
            {
                key: "name",
                name: "Mariana",
                textAlign: "center"
            },
            {
                key: "placing",
                name: "-",
                textAlign: "center"
            },
            {
                key: "profession",
                name: "V-Tuber",
                textAlign: "center"
            },
            {
                key: "status",
                name: statusWithIcon("No jogo"),
                textAlign: "center"
            },
            {
                key: "elimination_day",
                name: "-",
                textAlign: "center",
            },
            {
                key: "actions",
                name: "Editar | Remover"
            },
        ],
        [
            {
                key: "image",
                name: participantImage(Camila, "Camila", false),
            },
            {
                key: "name",
                name: "Camila",
                textAlign: "center"
            },
            {
                key: "placing",
                name: "-",
                textAlign: "center"
            },
            {
                key: "profession",
                name: "Ex-BBBagunça 2",
                textAlign: "center"
            },
            {
                key: "status",
                name: statusWithIcon("Líder"),
                textAlign: "center"
            },
            {
                key: "elimination_day",
                name: "-",
                textAlign: "center",
            },
            {
                key: "actions",
                name: "Editar | Remover"
            },
        ],
        [
            {
                key: "image",
                name: participantImage(Joao, "João Lucas", true),
            },
            {
                key: "name",
                name: "João Lucas",
                textAlign: "center"
            },
            {
                key: "profession",
                name: "Instrutor de Crossfit",
                textAlign: "center"
            },
            {
                key: "placing",
                name: "25º Lugar",
                textAlign: "center"
            },
            {
                key: "status",
                name: statusWithIcon("Eliminado"),
                textAlign: "center"
                
            },
            {
                key: "elimination_day",
                name: "30",
                textAlign: "center",
            },
            {
                key: "actions",
                name: "Editar | Remover"
            },
        ],
        [
            {
                key: "image",
                name: participantImage(Weslei, "Weslei", false),
            },
            {
                key: "name",
                name: "Weslei",
                textAlign: "center"
            },
            {
                key: "placing",
                name: "-",
                textAlign: "center"
            },
            {
                key: "profession",
                name: "Ex-BBBagunça 2",
                textAlign: "center"
            },
            {
                key: "status",
                name: statusWithIcon("Anjo"),
                textAlign: "center"
            },
            {
                key: "elimination_day",
                name: "-",
                textAlign: "center",
            },
            {
                key: "actions",
                name: "Editar | Remover"
            },
        ],
        [
            {
                key: "image",
                name: participantImage(Afrodite, "Afrodite", false),
            },
            {
                key: "name",
                name: "Afrodite",
                textAlign: "center"
            },
            {
                key: "placing",
                name: "-",
                textAlign: "center"
            },
            {
                key: "profession",
                name: "Enfermeira",
                textAlign: "center"
            },
            {
                key: "status",
                name: statusWithIcon("Paredão"),
                textAlign: "center"
            },
            {
                key: "elimination_day",
                name: "-",
                textAlign: "center",
            },
            {
                key: "actions",
                name: "Editar | Remover"
            },
        ],
        [
            {
                key: "image",
                name: participantImage(Lorena, "Lorena", false),
            },
            {
                key: "name",
                name: "Lorena",
                textAlign: "center"
            },
            {
                key: "placing",
                name: "-",
                textAlign: "center"
            },
            {
                key: "profession",
                name: "Estudante de Odontologia",
                textAlign: "center"
            },
            {
                key: "status",
                name: statusWithIcon("Imune"),
                textAlign: "center"
            },
            {
                key: "elimination_day",
                name: "-",
                textAlign: "center",
            },
            {
                key: "actions",
                name: "Editar | Remover"
            },
        ],
        [
            {
                key: "image",
                name: participantImage(Flavio, "Flávio", true),
            },
            {
                key: "name",
                name: "Flávio",
                textAlign: "center"
            },
            {
                key: "placing",
                name: "20º Lugar",
                textAlign: "center"
            },
            {
                key: "profession",
                name: "Diretor de reality show",
                textAlign: "center"
            },
            {
                key: "status",
                name: statusWithIcon("Eliminado"),
                textAlign: "center"
            },
            {
                key: "elimination_day",
                name: "51",
                textAlign: "center",
            },
            {
                key: "actions",
                name: "Editar | Remover"
            },
        ],
        [
            {
                key: "image",
                name: participantImage(Gisele, "Gisele", false),
            },
            {
                key: "name",
                name: "Gisele",
                textAlign: "center"
            },
            {
                key: "placing",
                name: "-",
                textAlign: "center"
            },
            {
                key: "profession",
                name: "Ex-BBBagunça 2",
                textAlign: "center"
            },
            {
                key: "status",
                name: statusWithIcon("No jogo"),
                textAlign: "center"
            },
            {
                key: "elimination_day",
                name: "-",
                textAlign: "center",
            },
            {
                key: "actions",
                name: "Editar | Remover"
            },
        ],
    ]
    return (
        <div className="h-full w-full">
        <ToastContainer transition={Slide}/>
        {
            openedModal ? (
                <Modal
                    heightClass="max-h-2/3"
                    title={modalTitle}
                    setModal={setOpenedModal}
                >
                    <CrudParticipant infos={modalCrudContent} crudAction={crudOperation} setModal={setOpenedModal} setCrudParticipants={setCrudResult}/>
                </Modal>
            ) : <></>
        }
        {!pageLoading ? (
            <>
                <div className={
                    `w-full bg-purple-theme-tertiary h-12 flex items-center pl-5 text-xl rounded-tr-xl ${robotoBlack.className}`}
                >
                    Elenco de {reality?.name} {season?.season_number} {season?.codename && " - " + season.codename}
                </div>
                <div className="flex h-full justify-center mt-12">
                    <div>
                        <Table header={header} data={data}/>
                        <div className="text-right">
                            <button 
                                className={`bg-main-theme-primary p-3 text-zinc-200 mt-3 ${robotoBlack.className} hover:bg-main-theme-secondary transition duration-200 rounded-xl`}
                                onClick={() => {
                                        setModalTitle("Adicionar Participante")
                                        setCrudOperation("add")
                                    }
                                }
                            >
                                    Adicionar novo
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