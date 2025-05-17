import { optionsProps } from "@/utils/interfaces";

export default function Options({id, inputName, className, options, disabled, value, error, changeFunction}: optionsProps){
    return (
        <div className={className}>
            <label htmlFor={id} className="block pb-1">{inputName}</label>
            <input list={id} className="p-2 w-full rounded-lg text-zinc-900 bg-white" onBlur={(e) => {
                changeFunction(e.target.value)
            }}/>
            <datalist id={id}>
                {
                    options.map((option, index) => (
                        <option 
                            value={option} 
                            disabled={disabled?.includes(option)}
                            key={`option-${id}-${index}`}
                            defaultValue={value}
                        />
                    ))
                }
            </datalist>
            {error && (
                <div className="text-red-900 text-xs">{error}</div>
            )}
        </div>
    )
}