import SeasonsPage from "@/components/majorComponents/admin/seasonsPage"
export default async function FullArticle({
    params,
}: {
    params: Promise<{name: string}>
}){    
    const name = (await params).name
    return (
        <SeasonsPage index={name}/>
    )
}