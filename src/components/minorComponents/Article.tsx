import Link from 'next/link'
import '../../app/globals.css'
import { Roboto } from 'next/font/google'

import { id } from '@/utils/interfaces'

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function Article({id}: id) {
    return (
        <Link 
            className="group flex justify-between"
            href={`/article/${id}`}
        >
            <div className='h-40 w-80 bg-indigo-600 rounded-lg cursor-pointer'></div>
            <div className='w-2/3'>
                <div className='italic text-sm pb-1 text-main-theme-darker cursor-pointer'>Subtítulo</div>
                <div className={`pb-4 text-2xl ${robotoBlack.className} cursor-pointer text-main-theme-darker hover:text-main-theme-secondary hover:underline  group-hover:text-main-theme-secondary group-hover:underline `}>Título</div>
                <div className='w-full cursor-pointer'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris orci sem, semper a vulputate quis, volutpat quis orci. Maecenas tincidunt magna nulla. Quisque id ex auctor, tempus ex eu, suscipit turpis. Sed vitae mi nibh. Donec sed arcu eleifend, vulputate justo sed, condimentum nisl.
                </div>
            </div>
        </Link>
    )
}