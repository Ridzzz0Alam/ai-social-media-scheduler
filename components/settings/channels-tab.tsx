import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";


function ChannelsTabContent() {
    const searchParams = useSearchParams()


    const { data: channelsData, isPending } = useQuery({
    queryKey: ["channels"],
    queryFn: async () => {
      const res = await fetch("/api/channel");
      const data = await res.json();
      return data;
    },
  })

    const channels = channelsData?.channels || [];
    const connectedChannels = channels.filter((channel: any) => channel.connected);
    const unconnectedChannels = channels.filter((channel: any) => !channel.connected);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Channels</CardTitle>
                <CardDescription>
                    Connect your social media accounts to schedule posts
                </CardDescription>
            </CardHeader>

            <CardContent>
                
            </CardContent>
        </Card>
    )
}

export default ChannelsTabContent

const ChannelsTab = () => {
    return (
        <Suspense fallback={<div className="text-sm text-muted-foreground">Loading
        channels...</div>}>
            <ChannelsTabContent />
        </Suspense>
    )
}

function useQuery(arg0: { queryKey: string[]; queryFn: () => Promise<any>; }): { data: any; isPending: any; } {
    throw new Error("Function not implemented.");
}
