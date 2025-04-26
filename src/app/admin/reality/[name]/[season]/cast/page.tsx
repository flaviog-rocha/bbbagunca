import CastPage from "@/components/majorComponents/admin/castPage"

export default async function Cast({
    params,
}: {
    params: Promise<{name: string, season: string}>
}){
    const name = (await params).name
    const season = (await params).season

    return (
        <CastPage realityName={name} seasonNumber={season}/>
    )
}