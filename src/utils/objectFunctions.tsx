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
            console.log(info)
            if (info.key === key && typeof info.name === 'string'){
                return info.name;
            }
        }
    }

    return "";
}