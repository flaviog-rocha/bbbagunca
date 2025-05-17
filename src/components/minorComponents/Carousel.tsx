import { carouselProps, carouselPagesProps, buttonProps } from "@/utils/interfaces";

import { Roboto } from "next/font/google";
import '../../app/globals.css'
import { JSX } from "react";

function PassButton({buttonString}: buttonProps){
    return (
        <div className='w-6 h-6 rounded-full bg-main-theme-full-lighter hover:bg-main-theme-lighter transition duration-500 flex justify-center items-center select-none cursor-pointer'>
            {buttonString}
        </div>
    )
}

function CarouselPages({isActive}: carouselPagesProps){
    return (
        <div className={`rounded-full w-3 h-3 mx-2 ${isActive ? 'bg-main-theme-darker' : 'bg-main-theme-full-lighter'}`}></div>
    )
}

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
})

const robotoBlack = Roboto({
    weight: "900",
    subsets: ["latin"],
})

export default function Carousel({title, subtitle}: carouselProps){
    const CarouselPagesArray = () => {
        let pagesArray: JSX.Element[] = []

        for (let i = 0; i < 5; i++){
            pagesArray = [...pagesArray, <CarouselPages isActive={i === 0} key={'CarouselPage-' + i}/>]
        }

        return pagesArray;
    }
    return (
        <div className="w-4/6">
            <div className="w-full h-80 bg-indigo-900 rounded-xl flex p-5 box-border items-center justify-between">
                <PassButton buttonString='&#11164;'/>
                <PassButton buttonString='&#11166;'/>
            </div>
            <div className="relative bottom-32">
                <div className={`w-auto p-2 ml-12 mb-2 bg-main-theme-darker rounded-xl inline-flex box-border items-center justify-between text-xs text-stone-100 ${roboto.className}`}>
                    {subtitle}
                </div>
                <div>
                    <div className={`bg-main-theme-darker ml-12 rounded-xl inline-flex p-3 box-border items-center justify-between text-2xl text-stone-100 ${robotoBlack.className}`}>
                        {title}
                    </div>
                </div>
                <div className="w-full mt-3 flex justify-center">
                    {
                        CarouselPagesArray()
                    }
                </div>
            </div>
        </div>
    )
}