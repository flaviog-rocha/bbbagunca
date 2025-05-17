import { tagProperties } from "@/utils/interfaces"

export default function ArticleTag({tag}: tagProperties){
    return (
        <div className="bg-main-theme-primary text-zinc-100 p-2 rounded-xl mr-2 shadow-lg">
            {tag}
        </div>
    )
}