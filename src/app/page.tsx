import { JSX } from "react";
import ProfileIcon from "./components/ProfileIcon";
import Carousel from "./components/Carousel";
import Article from "./components/Article";

function headerIcons(){
  let iconArray: JSX.Element[] = [];
  const houseguests: string[] = ["Afrodite", "Alexandre", "Breno", "Camila", "Carla", "Daniel", "Domitila", "Eduardo", "Elizabeth", "Flávio", "Gabriela",
    "Gisele", "Hugo", "Isabel", "João Lucas", "Leandro", "Leonardo", "Lorena", "Marcela", "Mariana", "Michel", "Milena", "Paloma", "Patrícia", "Phelipe",
    "Renato", "Rita", "Roberto", "Silmara", "Thiago", "Thonny", "Weslei"
  ];

  for (const name of houseguests){
    iconArray = [...iconArray, <ProfileIcon name={name} key={name}/>]
  }

  return iconArray;
}
export default function Home() {
  const iconArray = headerIcons();

  return (
    <div>
      <div className={`w-full h-${iconArray.length > 24 ? '36' : '24'} bg-purpleThemeSecondary flex justify-center items-center mb-12`}>
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
          <div className='h-0.5 bg-purpleThemeTertiary w-full mx-auto my-5'></div>
          <Article id={2}/>
        </div>
      </div>
    </div>
  );
}
