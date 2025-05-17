import { inputProps } from "@/utils/interfaces"

export default function Input({id, inputName, className, value, error, changeFunction, type}: inputProps){
    return (
        <div className={className}>
            <label htmlFor={id} className="block pb-1">{inputName}</label>
            <input 
                id={id}
                className="p-2 w-full rounded-lg text-zinc-900 bg-white"
                placeholder={inputName}
                defaultValue={value}
                onBlur={(e) => {
                    changeFunction(`${e.target.value || ''}`)
                }}
                type={type}
            />
            {error && (
                <div className="text-red-900 text-xs">{error}</div>
            )}
        </div>
    )
}