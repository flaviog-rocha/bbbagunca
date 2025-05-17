import { JSX } from "react";
import ProfileIcon from "@/components/minorComponents/ProfileIcon";
import Carousel from "@/components/minorComponents/Carousel";
import Article from "@/components/minorComponents/Article";
import { realityName } from "@/utils/interfaces";

function headerIcons(){
  let iconArray: JSX.Element[] = [];
  const houseguests: string[] = ["Afrodite", "Alexandre", "Breno", "Camila", "Carla", "Daniel", "Domitila", "Eduardo", "Elizabeth", "Flávio", "Gabriela",
    "Gisele", "Hugo", "Isabel", "João Lucas", "Leandro", "Leonardo", "Lorena", "Marcela", "Mariana", "Michel", "Milena", "Paloma", "Patrícia", "Phelipe",
    "Renato", "Rita", "Roberto", "Silmara", "Thiago", "Thonny", "Weslei"
  ];

  for (const name of houseguests){
    iconArray = [...iconArray, <ProfileIcon participantName={name} key={name}/>]
  }

  return iconArray;
}

export default function MainPage({index}: realityName){
  const iconArray = headerIcons();

  return (
    <div>
      <div className={`w-full h-${iconArray.length > 24 ? '36' : '24'} bg-purple-theme-secondary flex justify-center items-center mb-12`}>
        <div>
          <div className="flex items-center">
            {iconArray.length > 24 ? iconArray.slice(0, iconArray.length/2) : iconArray}
          </div>
          {
            iconArray.length > 24 ? (<div className="flex items-center">
              {iconArray.slice(iconArray.length/2, iconArray.length)}
            </div>) : <></>
          }
        </div>
      </div>
      <div 
        className="flex justify-center"
      >
          <Carousel 
            title={"Insira aqui um título muito bom!"}
            subtitle={"Definitivamente um subtítulo."}
          />
      </div>
      <div 
        className="flex justify-center"
        style={{
          marginTop: '-80px'
        }}
      >
        <div className="w-4/6">
          <Article id={1}/>
          <div className='h-0.5 bg-purple-theme-tertiary w-full mx-auto my-5'></div>
          <Article id={2}/>
        </div>
      </div>
    </div>
  );
}