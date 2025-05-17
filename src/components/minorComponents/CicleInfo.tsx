import { JSX } from 'react'
import '../../app/globals.css'
import { Roboto } from 'next/font/google'

import { cicle } from '@/utils/interfaces'

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function CicleInfo({number, infos}: cicle){
    const infosList = (): JSX.Element => {
        const list: JSX.Element[] = []

        let i: number = 0;
        for (const info of infos){
            list.push(
                <li key={`cicle-${number}-info-${i}`} className='list-desc p-1'>• {info}</li>
            )
            i++;
        }

        return (
            <ul>
                {list}
            </ul>
        )
    }

    return (
        <div className='flex justify-center'>
            <div className='peer w-24 h-24 rounded-2xl bg-purple-theme-secondary flex justify-center items-center flex-col'>
                <div className='text-sm'>
                    Ciclo
                </div>
                <div className={`text-2xl ${robotoBlack.className}`}>
                    {number}
                </div>
                
            </div>
            <div className='relative w-0 h-0 left-1 rounded-xl opacity-0 z-10 peer-hover:block peer-hover:opacity-100 transition duration-500 ease-in-out text-sm text-zinc-100'>
                <div className='absolute'>
                    <div className='bg-main-theme-darker min-w-64 p-2 flex justify-center mx-auto rounded-2xl'>
                        {infos?.length > 0 ? infosList() : "Sem informações."}
                    </div>
                </div>
            </div>
        </div>
    )
}