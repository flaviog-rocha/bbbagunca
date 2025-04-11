import ParticipantPage from "@/components/majorComponents/participantPage"

export default async function Participant({
    params,
}: {
    params: Promise<{name: string}>
}){
    const participant: string = (await params).name
    
    return (
        <ParticipantPage participantName={participant}/>
    )
}