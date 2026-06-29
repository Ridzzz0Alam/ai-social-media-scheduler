import { optimisticKey } from "react"


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

    
function createProvider(){
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
            if(optimisticKey.pkce && codeChallenge && codeChallengeMethod){
                params.append("code_challenge", codeChallenge)
                params.append("code_challenge_method", codeChallengeMethod)
            }
            return `${config.authUrl}?${params.toString()}`
        }
    }
}