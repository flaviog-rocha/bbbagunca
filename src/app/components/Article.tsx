import '../globals.css'
import { Roboto } from 'next/font/google'

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default function Article() {
    return (
        <>
            <div className="flex justify-between">
                <div className='h-40 w-80 bg-indigo-600 rounded-lg'></div>
                <div className='w-2/3'>
                    <div className='italic text-sm pb-1 text-mainThemeDarker'>Subtítulo</div>
                    <div className={`pb-4 text-2xl ${robotoBlack.className} text-mainThemeDarker`}>Título</div>
                    <div className='w-full'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris orci sem, semper a vulputate quis, volutpat quis orci. Maecenas tincidunt magna nulla. Quisque id ex auctor, tempus ex eu, suscipit turpis. Sed vitae mi nibh. Donec sed arcu eleifend, vulputate justo sed, condimentum nisl.
                    </div>
                </div>
            </div>
        </>
    )
}