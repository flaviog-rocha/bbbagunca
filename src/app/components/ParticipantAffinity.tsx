import '../globals.css'
import Image from 'next/image';

interface Houseguests {
    name: string,

}

export default function ParticipantAffinity({name}: Houseguests){
    return (
        <div>
            <div className='flex'>
                { /*eslint-disable-next-line @typescript-eslint/no-require-imports*/}
                <Image src={JSON.parse(JSON.stringify(require(`../../../public/img/portraits/${name}.png`)))} alt={"Participante Afrodite"} width={90} height={90}
                    className="peer w-8 h-8 lg:w-16 lg:h-16 rounded-full bg-indigo-50 m-2 shrink-0"
                >
                </Image>
                <div className='flex flex-col items-start justify-center'>
                    <p>{name}</p>
                    <div className='w-64 h-4 rounded-full mt-2 bg-gradient-to-r from-stone-200 to-stone-500'>
                        <div className='h-4 rounded-full bg-gradient-to-r from-green-50 to-green-200' style={{width: "70%"}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}