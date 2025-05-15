import { JSX } from "react"

export interface name {
    participantName: string,
}
export interface id {
    id: number
}

export interface seasonName {
    seasonName: string,
}

export interface tagProperties {
    tag: string
}

export interface realityName {
    index: string
}

export interface buttonProps {
    buttonString: string,
} 

export interface carouselPagesProps {
    isActive: boolean,
}

export interface checkboxProps {
    state: boolean,
    setState: (opened: boolean) => void,
    text: string,
    className?: string
}

export interface infosInterface {
    infos: dataInterface[] | ArrayConstructor,
    crudAction: string,
    setModal: (opened: boolean) => void,
    setCrudReality: (data: crudReality) => void,
}

export interface crudSeasonInfos {
    id_season: number,
    season_number: number,
    codename: string | null,
    current: boolean,
}
export interface crudSeasonInfosWithReality extends crudSeasonInfos{
    reality: apiReality
}

export interface traitInfo {
    trait: string,
}
export interface crudParticipantsInfos {
    id_participant?: number,
    name: string,
    gender: string,
    age?: number,
    biografy?: string,
    profession?: string,
    status?: string,
    elimination_date?: number,
    traits: traitInfo[],
}

export interface crudTraitInfos {
    id_trait?: number,
    trait: string,
    trait_f?: string,
}

export interface crudSeason {
    infos: dataInterface[] | ArrayConstructor,
    crudAction: string,
    setModal: (opened: boolean) => void,
    setCrudSeason: (data: crudSeasonInfos) => void,
}

export interface crudParticipants {
    infos: dataInterface[] | ArrayConstructor,
    crudAction: string,
    setModal: (opened: boolean) => void,
    setCrudParticipants: (data: crudParticipantsInfos) => void,
}

export interface crudTraits {
    infos: dataInterface[] | ArrayConstructor,
    crudAction: string,
    setModal: (opened: boolean) => void,
    setCrudTraits: (data: crudTraitInfos) => void,
}
export interface carouselProps {
    title: string,
    subtitle: string,
}

export interface cicle {
    number: number,
    infos: string[],
}

export interface confirmModalInterface {
    message: string
    buttons?: JSX.Element[]
}

export interface imagesListType {
    label: string,
    image: string,
}

export interface participantInfoProps {
    infoClass: string,
    info: string
}

export interface sidebarProps {
    icon: string,
    name: string,
    link: string,
}

export interface castInfo {
    realityName: string,
    seasonNumber: string,
}

export interface tableInterface {
    header: rowContent[],
    data?: rowContent[][],
    isLoading?: boolean,
}

export interface dataInterface {
    key: string,
    name: string | JSX.Element,
    size?: number,
    textAlign?: string,
}

export interface inputProps {
    id: string,
    inputName: string,
    className?: string,
    value?: string | number,
    error?: string,
    type?: string,
    changeFunction: (text: string) => void
}

export interface optionsProps {
    id: string,
    inputName: string,
    options: string[],
    className?: string,
    disabled?: string[],
    value?: string,
    error?: string,
    changeFunction: (text: string) => void
}

export interface modalProps {
    title: string,
    widthClass?: string,
    heightClass?: string,
    setModal: (opened: boolean) => void,
}

export interface rowContent {
    key: string,
    name: string | JSX.Element,
    size?: number,
    textAlign?: string,
}

export interface apiReality {
    id_reality: number,
    name_code: string,
    name: string,
    max_power?: string,
    sec_power?: string | null,
    danger_zone?: string | null,
    safe_zone?: string | null,
}

export interface realitiesTableData {
    key: string,
    name: string | JSX.Element,
    size?: number,
    textAlign?: string,
}

export interface crudReality {
    id_reality?: number,
    name: string,
    max_power?: string,
    sec_power?: string,
    danger_zone?: string,
    safe_zone?: string,
}