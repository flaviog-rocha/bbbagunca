import { modalProps } from "@/utils/interfaces"

import Icon from "@mdi/react"
import { mdiClose } from "@mdi/js"

export default function Modal({children, title, widthClass, heightClass, setModal}: React.PropsWithChildren<modalProps>){
    return(
        <div>
            <div className="w-screen h-screen bg-black absolute top-0 right-0 opacity-60 z-10" ></div>
            <div className="w-screen h-screen flex absolute top-0 right-0 justify-center items-center z-20" 
                id="modal-background"
                onClick={(e) => {
                    if(e.target.id === "modal-background"){
                        setModal(false)
                    }
                }}
                
            >
                {/* <div className="h-2/3 w-96 bg-blue-500 flex justify-center items-center">
                    <div>
                        <div className="h-32 w-32 bg-green-500">

                        </div>
                        <div className="h-32 w-32 bg-red-500">

                        </div>
                    </div>
                </div> */}
                <div className={`${heightClass} ${widthClass} flex items-center`}>
                    <div className="h-full">
                        <div className="text-white w-full bg-mainThemePrimary p-3 text-lg font-bold flex justify-between">
                            <div>
                                {title}
                            </div>
                            <div className="flex h-full">
                                <button className="hover:text-black transition duration-200" onClick={() => setModal(false)}>
                                    <Icon path={mdiClose} size={1}/>
                                </button>
                            </div>
                        </div>
                        <div className="bg-purpleThemePrimary w-full h-full overflow-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}