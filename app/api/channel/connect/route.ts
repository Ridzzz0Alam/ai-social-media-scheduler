import { getInsforgeServerClient } from "@/lib/insforge-server";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {

        const {insforge, userId} = await getInsforgeServerClient();
        if (!userId) return NextResponse.json({ error: "User not found" }, { status: 401 });

        const {channelTypeId} = await request.json();
        if(!channelTypeId) return NextResponse.json({ error: "Channel type ID is required" }, { status: 400 });

        const {data: channelType, error} = await insforge.database
        .from("channel_types")
        .select("id,type")
        .eq("id", channelTypeId)
        .single();
        
        if(error) return NextResponse.json({ error: "Channel type not found" }, { status: 404 });
        
        
        return Response.json({ message: "Connected" });
    } catch (error) {
        return Response.json({ message: "Error connecting" }, { status: 500 });
    }
}