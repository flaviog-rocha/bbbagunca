interface InputProps {
    id: string,
    inputName: string,
    className?: string,
}

export default function Input({inputName, id, className}: InputProps){
    return (
        <div className={className}>
            <label htmlFor={id} className="block pb-1">{inputName}</label>
            <input 
                id={id}
                className="p-2 w-96 rounded-lg"
                placeholder={inputName}
            />
        </div>
    )
}