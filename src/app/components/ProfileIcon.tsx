'use client'

import Link from 'next/link';
import '../globals.css'
import Image from 'next/image';

interface Houseguests {
    name: string,

}

export default function ProfileIcon({name}: Houseguests){
    return (
        <Link href={`/participant/${name}`}>
           { /*eslint-disable-next-line @typescript-eslint/no-require-imports*/}
            <Image src={require(`../../../public/img/portraits/${name}.png`)} alt={"Participante Afrodite"} width={50} height={50}
                className="peer w-8 h-8 lg:w-12 lg:h-12 hover:scale-125 hover:bg-indigo-200 transition duration-500 ease-in-out rounded-full bg-indigo-50 m-2 shrink-0 cursor-pointer"
            >
            </Image>
            <div className='absolute rounded-xl opacity-0 z-10 peer-hover:block peer-hover:opacity-100 hidden transition duration-500 ease-in-out text-sm text-zinc-100'>
                <div className='bg-indigo-600 p-2 w-28 flex justify-center mx-auto rounded-2xl' style={{marginLeft: '-25px', boxSizing: 'border-box'}}>
                    {name}
                </div>
            </div>
        </Link>
    )
}