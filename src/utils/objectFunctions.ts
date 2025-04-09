import { JSX } from "react";

interface dataInterface {
    key: string,
    name: string | JSX.Element,
    size?: number,
    textAlign?: string,
}

export const getInfoKey = (infos: dataInterface[] | ArrayConstructor, key: string) => {
    if (typeof infos === 'object')
    {
        for (const info of infos){
            if (info.key === key && typeof info.name !== 'object'){
                return info.name.toString();
            }
        }
    }

    return "";
}