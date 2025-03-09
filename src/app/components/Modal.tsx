import Icon from "@mdi/react"
import { mdiClose } from "@mdi/js"

interface ModalProps {
    title: string,
    width?: string,
    height?: string,
    setModal: (opened: boolean) => void,
}

export default function Modal({children, title, width, height, setModal}: React.PropsWithChildren<ModalProps>){
    return(
        <div>
                <>
                    <div className="w-screen h-screen bg-black absolute top-0 right-0 opacity-60" ></div>
                    <div className="w-screen h-screen flex absolute top-0 right-0 justify-center items-center" 
                        id="modal-background"
                        onClick={(e) => {
                            if(e.target.id === "modal-background"){
                                setModal(false)
                            }
                        }}
                        
                    >
                        <div>
                            <div className={`${width ? 'w-'+ width : ''} ${height ? 'h-'+ height : ''}`}>
                                <div className="text-white w-full bg-mainThemePrimary p-3 text-lg font-bold flex justify-between">
                                    <div>
                                        {title}
                                    </div>
                                    <div className="flex">
                                        <button className="hover:text-black transition duration-200" onClick={() => setModal(false)}>
                                            <Icon path={mdiClose} size={1}/>
                                        </button>
                                        
                                    </div>
                                </div>
                                <div className="bg-purpleThemePrimary w-full">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        </div>
    )
}