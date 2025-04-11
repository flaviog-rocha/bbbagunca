import MainPage from "@/components/majorComponents/mainPage"

export default async function Home({
    params,
}: {
    params: Promise<{index: string}>
}) {
    return (
        <MainPage index={(await params).index}/>
    )
}
