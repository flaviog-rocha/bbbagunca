import { inputProps } from "@/utils/interfaces"

export default function AreaInput({id, inputName, className, value, error, changeFunction}: inputProps){
    return (
        <div className={className}>
            <label htmlFor={id} className="block pb-1">{inputName}</label>
            <textarea 
                id={id}
                className="p-2 w-full h-48 rounded-lg text-zinc-900"
                placeholder={inputName}
                defaultValue={value}
                onBlur={(e) => {
                    changeFunction(`${e.target.value || ''}`)
                }}
            />
            {error && (
                <div className="text-red-900 text-xs">{error}</div>
            )}
        </div>
    )
}