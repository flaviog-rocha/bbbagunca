import ArticlePage from "@/components/majorComponents/articlePage"

export default async function FullArticle({
    params,
}: {
    params: Promise<{id: number}>
}){    
    const id = (await params).id
    return (
        <ArticlePage id={id}/>
    )
}