import { JSX } from "react"

interface ConfirmModalInterface {
    message: string
    buttons?: JSX.Element[]
}

export default function ConfirmModal({message, buttons}: ConfirmModalInterface){
    return (
        <div className="p-4">
            <div>
                {message}
            </div>
            <div className="mt-3 text-center">
                {
                    buttons?.map((button) => {
                        return button;
                    })
                }
            </div>
        </div>
    )
}