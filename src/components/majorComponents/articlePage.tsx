import { Roboto } from "next/font/google"
import ArticleTag from "@/components/minorComponents/ArticleTag"
import { id } from "@/utils/interfaces"

const robotoBlack = Roboto({
    weight: "900",
    subsets: ["latin"],
})

export default function ArticlePage({id}: id){
    return (
        <div className="p-5 flex flex-col items-center">
                <div className="text-md">Fogo no parquinho! (Notícia de id {id})</div>
                <div className={`w-1/2 ${robotoBlack.className} text-4xl mt-2 text-mainThemeDarker`}>UM TÍTULO MUITO IRADO PARA DAR UM SUPER IMPACTO NESSA GRANDÍSSIMA NOTÍCIA</div>
                <div className="w-1/2 text-sm mt-5">Atualizado em 24 de dezembro de 2024, às 01 h 30.</div>
                <div className="h-72 w-1/2 bg-indigo-600 rounded-2xl my-2"></div>
                <div className="text-sm w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum vel ligula a fermentum. Suspendisse pharetra, augue ultrices mollis molestie, nisl nibh ornare elit, eget lacinia augue lectus ac mi.</div>
                <div className="w-5/6 my-8 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum vel ligula a fermentum. Suspendisse pharetra, augue ultrices mollis molestie, nisl nibh ornare elit, eget lacinia augue lectus ac mi. Aliquam efficitur dapibus mi, non aliquam nisi molestie quis. Pellentesque ante nulla, imperdiet nec nisi non, venenatis tempus mi. Nunc nisl metus, scelerisque ac hendrerit a, pulvinar id magna. Donec pulvinar consectetur lectus quis eleifend. Pellentesque ut lectus cursus, gravida est in, dapibus ligula. Nam at mauris imperdiet, aliquet enim ac, viverra ipsum. Pellentesque a tristique sem.<br/><br/>

                Integer non sem lacus. Etiam ac felis volutpat, aliquet turpis eu, tincidunt quam. Maecenas varius ut libero ac cursus. Donec ac ex eget ipsum vulputate bibendum sit amet vitae odio. Etiam ultricies magna erat, sollicitudin mollis magna congue vitae. Sed eget iaculis eros. Aenean quis felis at dui rutrum feugiat. In ultricies non mauris ac sodales. Etiam rhoncus tempus lectus vel pretium. Cras condimentum, dui suscipit commodo dictum, quam risus feugiat eros, sit amet bibendum est felis euismod quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.<br/><br/>

                Morbi sollicitudin viverra ornare. Mauris suscipit consequat mauris in varius. Phasellus tempus sapien nisi, sed aliquet nisl finibus non. Pellentesque sit amet pellentesque dui. Donec ultrices ornare nibh, ut ornare erat finibus at. Suspendisse cursus sollicitudin magna, eu mollis felis sodales a. Nullam vel scelerisque est. Praesent auctor tempus ante at tristique. Proin rutrum nibh egestas mi commodo fermentum. Morbi malesuada erat in odio lobortis ultricies. Cras euismod tortor non felis suscipit, sed cursus lacus maximus. Nunc nisl diam, vehicula finibus pellentesque nec, pretium sit amet ligula. Curabitur elit felis, molestie ut tempor quis, pellentesque sed nisi. Sed vitae tempor sem. Aliquam dignissim libero vitae sapien accumsan rutrum vitae sed nulla. Suspendisse sollicitudin lorem non vestibulum facilisis.<br/><br/>

                Suspendisse in felis faucibus, tristique odio non, tempor ex. Suspendisse iaculis risus odio. Proin iaculis enim ut tortor blandit, ut dignissim erat aliquam. Mauris aliquet pharetra urna. Pellentesque scelerisque ornare nisi sed tempus. Donec porta elementum molestie. Fusce vel iaculis orci, vitae suscipit dui.<br/><br/>

                Curabitur luctus, ligula quis pellentesque maximus, augue tellus finibus felis, aliquam scelerisque nulla nisl vel lectus. Nulla facilisi. Ut id euismod augue. Duis vehicula magna a risus congue, a facilisis lectus ultrices. Sed ac malesuada neque. Maecenas quis leo vitae velit facilisis viverra. Vivamus quis nisi erat. Curabitur dignissim, justo at vestibulum rutrum, magna augue tristique dolor, eget tempor eros elit a urna. Sed laoreet orci vel risus porta commodo. Mauris semper metus eu lobortis blandit. Nullam sollicitudin vestibulum sem ac congue. Proin tincidunt nulla orci. Nulla vitae euismod odio. Pellentesque eleifend vehicula venenatis. Nullam cursus ex ut urna sagittis venenatis. Donec rutrum risus non porttitor sodales.
                </div>
                <div className="w-5/6 flex">
                    <ArticleTag tag="Tag 1"/>
                    <ArticleTag tag="Alguma Tag"/>
                    <ArticleTag tag="Outra Tag de Exemplo"/>
                </div>
        </div>
    )
}