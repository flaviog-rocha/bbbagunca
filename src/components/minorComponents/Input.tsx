import { inputProps } from "@/utils/interfaces"

export default function Input({inputName, id, className, value}: inputProps){
    return (
        <div className={className}>
            <label htmlFor={id} className="block pb-1">{inputName}</label>
            <input 
                id={id}
                className="p-2 w-96 rounded-lg text-zinc-900"
                placeholder={inputName}
                defaultValue={value}
            />
        </div>
    )
}