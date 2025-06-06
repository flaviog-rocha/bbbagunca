import Icon from "@mdi/react"
import { mdiToggleSwitch, mdiToggleSwitchOffOutline  } from "@mdi/js"

import { checkboxProps } from "@/utils/interfaces"

export default function Checkbox({state, setState, text, className}: checkboxProps){
    return (
        <div className={`flex items-center ${className}`} onClick={() =>
            setState(!state)
        }>
            {
                state ?
                (<Icon path={mdiToggleSwitch} size={1.7} className="text-main-theme-primary cursor-pointer"></Icon>) : 
                (<Icon path={mdiToggleSwitchOffOutline} size={1.7} className="text-main-theme-primary cursor-pointer"></Icon>)
            }
            <span className="ml-3 select-none">{text}</span>
        </div>
    )
}