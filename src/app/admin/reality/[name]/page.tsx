export default async function FullArticle({
    params,
}: {
    params: Promise<{name: string}>
}){    
    const name = (await params).name
    return (
        <div>
            {name}
        </div>
    )
}