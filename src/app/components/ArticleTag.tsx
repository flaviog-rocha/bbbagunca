interface TagProperties {
    tag: string
}

export default function ArticleTag({tag}: TagProperties){
    return (
        <div className="bg-mainThemePrimary text-zinc-100 p-2 rounded-xl mr-2 shadow-lg">
            {tag}
        </div>
    )
}