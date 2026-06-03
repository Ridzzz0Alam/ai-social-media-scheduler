import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";


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
                <div>
                    {isPending ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="flex items-center justify-between rounded-xl border p-4">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="size-6 rounded-sm bg-secondary"/>
                                    <Skeleton className="h-5 w-24 bg-secondary"/>
                                </div>
                               <Skeleton className="h-8 w-20 bg-secondary"/>
                            </div>
                        ))
                    ) : (
                        <>

                        </>
                    )}
                </div>
                
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
