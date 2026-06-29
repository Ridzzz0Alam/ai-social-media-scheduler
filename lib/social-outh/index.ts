import { ChannelTypeEnum } from "@/constants/channels"
import { OAuthProvider } from "./types"
import { refresh } from "next/cache"

function getEnv(key: string) {
    const value =  process.env[key]
    if (!value) throw new Error(`${key} is not defined`)
        return value
}

function getConfig(type:ChannelTypeEnum) {
    return {
        authUrl: getEnv(`${type}_AUTH_URL`),
        tokenUrl: getEnv(`${type}_TOKEN_URL`),
        profileUrl: getEnv(`${type}_PROFILE_URL`),
        clientId: getEnv(`${type}_CLIENT_ID`),
        clientSecret: getEnv(`${type}_CLIENT_SECRET`),
        scope: getEnv(`${type}_SCOPES`).split(',').map(s => s.trim()).filter(Boolean),
    }
}


async function requestToekn(
    type: ChannelTypeEnum,
    body: URLSearchParams,
) {
    const config = getConfig(type)
    const headers: Record<string, string> = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
    }

    if(type == ChannelTypeEnum.INSTAGRAM){
        headers.Authorization = `Basic ${auth_header}`
    }
    
    const response = await fetch(config.tokenUrl, {
        method: 'POST',
        headers,
        body,
    })

    const data = await response.json()
    
    if (!response.ok) {
        throw new Error(data?.error_description || data?.error || `Token exchange failed: ${response.statusText}`)
    }
    
    return response.json()
}

    
function createProvider(type: ChannelTypeEnum,opts: { pkce?: boolean} = {}): OAuthProvider{
    return {
        type: "",
        getAuthorizationUrl: () => {
            const config = getConfig(type)

            // Build authorization URL with query paramters
            const params = new URLSearchParams({
                client_id: config.clientId,
                redirect_uri: config.redirectUri,
                response_type: "code",
                scope: config.scope,
            })
            if(opts.pkce && codeChallenge && codeChallengeMethod){
                params.append("code_challenge", codeChallenge)
                params.append("code_challenge_method", codeChallengeMethod)
            }
            return `${config.authUrl}?${params.toString()}`
        }
    }
}

const PROVIDERS: Record<ChannelTypeEnum, any> = {
    [ChannelTypeEnum.TWITTER]: createProvider(ChannelTypeEnum.TWITTER,{ pkce: true }),
    [ChannelTypeEnum.LINKEDIN]: createProvider(ChannelTypeEnum.LINKEDIN),
    [ChannelTypeEnum.INSTAGRAM]: createProvider(ChannelTypeEnum.INSTAGRAM),
    [ChannelTypeEnum.FACEBOOK]: createProvider(ChannelTypeEnum.FACEBOOK),
    [ChannelTypeEnum.THREADS]: createProvider(ChannelTypeEnum.THREADS),
    [ChannelTypeEnum.BLUESKY]: createProvider(ChannelTypeEnum.BLUESKY),
    [ChannelTypeEnum.YOUTUBE]: createProvider(ChannelTypeEnum.YOUTUBE),
    [ChannelTypeEnum.TIKTOK]: createProvider(ChannelTypeEnum.TIKTOK),
}

export function getProvider(type: ChannelTypeEnum){
    return PROVIDERS[type]
}

export async function refreshOauthToken(
  type:ChannelTypeEnum,
  refreshToken:string,
  redirectUri:string,
){
  console.log("refreshing token", type, refreshToken, redirectUri)
  const provider = getOAuthProvider(type);
  if(!provider.refreshToken){
    throw new Error('Refresh token not supported for this provider');
  }
  const result = await provider.refreshToken({refreshToken, redirectUri});
  return result;
}