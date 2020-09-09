import Axios from 'axios'

import { getAccessToken } from './Authentication.service'

const applicationName = 'application'

export const hello = async (): Promise<{}> => {
    const { REACT_APP_APPLICATION_BASE_URL } = process.env

    const response = await Axios.get(`${REACT_APP_APPLICATION_BASE_URL}/hello`, {
        headers: {
            Authorization: await getAccessToken(applicationName)
        }
    })

    return response
}
