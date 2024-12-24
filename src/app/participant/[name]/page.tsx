import Image from "next/image";
import { Roboto } from "next/font/google";
import ParticipantInfo from "@/app/components/ParticipantInfo";
import Camila from '../../../../public/img/full-pic/Isabel.png';
import ParticipantAffinity from "@/app/components/ParticipantAffinity";
import CicleInfo from "@/app/components/CicleInfo";
import { JSX } from "react";

const robotoBlack = Roboto({
  weight: "900",
  subsets: ["latin"],
})

export default async function Participant({
    params,
}: {
    params: Promise<{name: string}>
}){
    const participant: string = (await params).name
    const image: string = JSON.parse(JSON.stringify(Camila))
    const participantsList: string[] = ["Afrodite", "Alexandre", "Breno", "Camila", "Carla", "Daniel", "Domitila", "Eduardo", "Elizabeth",
        "Flávio", "Gabriela", "Gisele", "Hugo", "Isabel", "João Lucas", "Leandro", "Leonardo", "Lorena", "Marcela", "Mariana", "Michel", "Milena",
        "Paloma", "Patrícia", "Phelipe", "Renato", "Rita", "Roberto", "Silmara", "Thiago", "Thonny", "Weslei"]

    const listAfinity = (): JSX.Element[] => {
        // const listLines: number = (participantsList.length / 3).toFixed(0)
        let arrayLine: JSX.Element[] = [];
        let finalArray: JSX.Element[] = [];

        for (const index in participantsList){
            if (participantsList[index] !== participant){
                arrayLine = arrayLine.concat(<ParticipantAffinity name={participantsList[index]} key={`afinity-${participantsList[index]}`}/>)
            }

            if (arrayLine.length === 3 || Number(index) === participantsList.length - 1){
                finalArray = finalArray.concat(
                    <div className="flex w-full justify-around mb-3" key={`afinityLine-${finalArray.length}`}>
                        {arrayLine}
                    </div>
                )
                // finalArray.concat(arrayLine)
                arrayLine = [];
            }
        }

        return (finalArray)
    }

    const cicleList = (totalCicles: number): JSX.Element[] => {
        let partialList: JSX.Element[] = []
        const finalList: JSX.Element[] = []

        for (let i = 1; i <= totalCicles; i++){
            partialList.push(<CicleInfo number={i} infos={["Informação 1", "Informação 2", "Informação 3", "Alguma informação bem relevante de número 4."]} key={`cicle-${i}`}/>)
            
            if (i % 4 === 0 || i === totalCicles){
                finalList.push(
                    <div className="flex justify-around p-5" key={`lineCicle-${i/3}`}>
                        {partialList}
                    </div>
                )

                partialList = []
            }
        }

        return finalList
    }

    return (
        <>
            <div className="h-96 w-full bg-purpleThemeLighter flex">
                <div className="h-96 w-full flex flex-col items-center justify-center">
                    <div className={`text-5xl text-mainThemeDarker ${robotoBlack.className}`}>
                        {participant.toUpperCase()}
                    </div>
                    <div className="text-lg mt-3">
                        <ParticipantInfo infoClass="Estrela" info="Estrela"/>
                    </div>

                    <div className="flex justify-end w-11/12 justify-around py-5 border-b-2 border-purpleThemePrimary">
                        <ParticipantInfo infoClass="Traço" info="Cabeça-Quente"/>
                        <ParticipantInfo infoClass="Traço" info="Socialmente Desconfortável"/>
                        <ParticipantInfo infoClass="Traço" info="Desajeitada"/>
                    </div>
                    <div className="flex justify-end w-11/12 justify-around py-5">
                        <ParticipantInfo infoClass="Líder" info="0x Líder"/>
                        <ParticipantInfo infoClass="Anjo" info="0x Anjo"/>
                        <ParticipantInfo infoClass="Imune" info="0x Imunizada"/>
                    </div>
                    <div className="flex justify-end w-11/12 justify-around pb-5">
                        <ParticipantInfo infoClass="Favorito do Líder" info="0x Favorito do Líder"/>
                        <ParticipantInfo infoClass="Paredão" info="0x Paredão"/>
                        <ParticipantInfo infoClass="Salvo" info="0x Salva do Paredão"/>
                    </div>
                    <div className="bg-green-400 p-4 rounded-3xl">No Jogo</div>
                </div>
                <div className="h-96 w-240 overflow-hidden">
                    {/*eslint-disable-next-line @typescript-eslint/no-require-imports*/}
                    <Image 
                        width={1000} 
                        height={1000} 
                        alt={`Participante ${participant}`} 
                        src={image}
                        style={{
                            marginTop: '-50px'
                        }}

                    />
                </div>
            </div>
            <div className="w-full text-center">
                <p className={`my-3 text-xl text-mainThemeDarker ${robotoBlack.className}`}>Afinidades</p>
                {listAfinity()}
                <div className="w-5/6 border-b-2 border-purpleThemeLighter mx-auto my-5"></div>
            </div>
            <div className="w-full text-center mb-8">
                <p className={`my-3 text-xl text-mainThemeDarker ${robotoBlack.className}`}>Histórico no Jogo</p>
                {cicleList(29)}
            </div>
        </>
    )
}