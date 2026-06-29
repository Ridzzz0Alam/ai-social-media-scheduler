import { ChannelTypeEnum } from "@/constants/channels";
import { getInsforgeServerClient } from "@/lib/insforge-server";
import { NextResponse } from "next/server";
import { getOAuthProvider } from "@/lib/oauth-providers";
import { createAuthState } from "@/lib/auth-state";
import { createPkcePair } from "@/lib/pkce";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;


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
        
        if(error || !channelType) return NextResponse.json({ error: "Channel type not found" }, { status: 404 });
  
        const redirectTo = `${APP_URL}/settings`;

        const provider = getOAuthProvider(channelType.type as ChannelTypeEnum);
        const state = createAuthState({
            userId,
            channelTypeId: channelType.id,
            channelType: channelType.type,
            redirectTo,
        })

        const callbackUrl = `${APP_URL}/api/channel/callback`

        const pkce = channelType.type === ChannelTypeEnum.TWITTER ? {
        createPkcePair() 
        : null

        const url = provider.getAuthorizationUrl({
            state,
            redirectUrl: callbackUrl,
            codeChallenge: pkce?.codeChallenge,
            codeChallengeMethod: pkce?.codeChallengeMethod,
        })

        const response = NextResponse.json({url})

        if(pkce) {
            response.cookies.set(getPkceCookieName(state), pkce.codeVerifier, {
                httpOnly: true,
                secure: true,
                path: "/",
                maxAge: 60 * 10, // 10 minutes
            })
        }

        return response;

    } catch (error) {
        return Response.json({ message: "Error connecting" }, { status: 500 });
    }
}