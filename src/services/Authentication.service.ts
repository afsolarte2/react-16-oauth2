import ClientOAuth2 from 'client-oauth2'

import { missingEnvVarError } from '../helpers/logging.helper'

export const ACCESS_TOKEN_SUFFIX = 'AccessToken'

export async function authenticateApplication(applicationName: string): Promise<string> {
    let oauth2Client: ClientOAuth2
    let accessToken = ''

    const envApplicationName = applicationName.toUpperCase()
    const authUrlEnvVarName = `REACT_APP_${envApplicationName}_AUTH_URL`
    const clientIdEnvVarName = `REACT_APP_${envApplicationName}_CLIENT_ID`
    const clientSecretEnvVarName = `REACT_APP_${envApplicationName}_CLIENT_SECRET`
    const scopeEnvVarName = `REACT_APP_${envApplicationName}_SCOPE`

    const accessTokenUri = process.env[authUrlEnvVarName] || ''

    if (!accessTokenUri)
        missingEnvVarError(authUrlEnvVarName)

    const clientId = process.env[clientIdEnvVarName] || ''

    if (!clientId)
        missingEnvVarError(clientIdEnvVarName)

    const clientSecret = process.env[clientSecretEnvVarName] || ''

    if (!clientSecret)
        missingEnvVarError(clientSecretEnvVarName)

    const scope = process.env[scopeEnvVarName] || ''

    if (!scope)
        missingEnvVarError(scopeEnvVarName)

    if (accessTokenUri &&
        clientId &&
        clientSecret &&
        scope
    ) {
        oauth2Client = new ClientOAuth2({
            accessTokenUri,
            clientId,
            clientSecret,
            scopes: [scope]
        })

        const { accessToken: authorizedAccessToken } = await oauth2Client.credentials.getToken()

        sessionStorage.setItem(`${applicationName}${ACCESS_TOKEN_SUFFIX}`, authorizedAccessToken)

        accessToken = authorizedAccessToken
    }

    return accessToken
}

export async function getAccessToken(applicationName: string): Promise<string> {
    const applicationToken = sessionStorage.getItem(`${applicationName}${ACCESS_TOKEN_SUFFIX}`)

    return applicationToken || await authenticateApplication(applicationName)
}
