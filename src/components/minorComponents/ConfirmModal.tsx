import { confirmModalInterface } from "@/utils/interfaces";

export default function ConfirmModal({message, buttons}: confirmModalInterface){
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