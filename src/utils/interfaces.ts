import { JSX } from "react"

export interface name {
    participantName: string,
}

export interface id {
    id: number
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

export interface infosInterface {
    infos: dataInterface[] | ArrayConstructor,
    crudAction: string,
    setModal: (opened: boolean) => void,
    setCrudReality: (data: crudReality) => void,
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

export interface iconProps {
    icon: string,
    name: string,
}

export interface tableInterface {
    header: rowContent[],
    data?: rowContent[][],
    isLoading: boolean,
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
    value?: string,
    error?: string,
    changeFunction: (text: string) => void
}

export interface modalProps {
    title: string,
    width?: string,
    height?: string,
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
    sec_power?: string,
    danger_zone?: string,
    safe_zone?: string,
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