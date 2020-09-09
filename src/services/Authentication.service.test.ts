import { mockSessionStorage } from '../testing/helpers/storage.helper'

jest.mock('client-oauth2', () => function () {
    return {
        credentials: {
            getToken: jest.fn().mockResolvedValue({ accessToken: 'NEW_ACCESS_TOKEN' })
        }
    }
})

jest.mock('../helpers/logging.helper', () => ({
    missingEnvVarError: jest.fn()
}))

import * as AuthenticationService from './Authentication.service'
import * as LoggingHelper from '../helpers/logging.helper'

describe('Authentication service', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('authenticateApplication', () => {
        let missingEnvVarErrorSpy = jest.spyOn(LoggingHelper, 'missingEnvVarError')

        beforeEach(() => {
            missingEnvVarErrorSpy = jest.spyOn(LoggingHelper, 'missingEnvVarError')

            mockSessionStorage({})
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it('should log error and return empty string when the environment variables does not exist', async () => {
            const applicationName = 'test_a'
            const accessToken = await AuthenticationService.authenticateApplication(applicationName)

            expect(missingEnvVarErrorSpy).toHaveBeenCalledTimes(4)
            expect(missingEnvVarErrorSpy).toHaveBeenCalledWith('REACT_APP_TEST_A_AUTH_URL')
            expect(missingEnvVarErrorSpy).toHaveBeenCalledWith('REACT_APP_TEST_A_CLIENT_ID')
            expect(missingEnvVarErrorSpy).toHaveBeenCalledWith('REACT_APP_TEST_A_CLIENT_SECRET')
            expect(missingEnvVarErrorSpy).toHaveBeenCalledWith('REACT_APP_TEST_A_SCOPE')
            expect(accessToken).toBe('')
        })

        it('should return the access token when all the environment variables exist', async () => {
            const DEFAULT_ENV = process.env

            process.env.REACT_APP_TEST_B_AUTH_URL = 'EXIST'
            process.env.REACT_APP_TEST_B_CLIENT_ID = 'EXIST'
            process.env.REACT_APP_TEST_B_CLIENT_SECRET = 'EXIST'
            process.env.REACT_APP_TEST_B_SCOPE = 'EXIST'

            const applicationName = 'test_b'
            const accessToken = await AuthenticationService.authenticateApplication(applicationName)

            expect(missingEnvVarErrorSpy).not.toHaveBeenCalled()
            expect(accessToken).toBe('NEW_ACCESS_TOKEN')

            process.env = DEFAULT_ENV
        })
    })

    describe('getAccessToken', () => {
        let authenticateApplicationSpy = jest.spyOn(AuthenticationService, 'authenticateApplication')


        beforeEach(() => {
            jest.clearAllMocks()

            mockSessionStorage({})
            authenticateApplicationSpy = jest.spyOn(AuthenticationService, 'authenticateApplication')
        })

        it("should call authenticateApplication when a token does not exist in session storage", async () => {
            const applicationName = 'test_c'

            await AuthenticationService.getAccessToken(applicationName)

            expect(sessionStorage.getItem).toHaveBeenCalledTimes(1)
            expect(sessionStorage.getItem).toHaveBeenCalledWith('test_cAccessToken')
            expect(authenticateApplicationSpy).toHaveBeenCalledTimes(1)
            expect(authenticateApplicationSpy).toHaveBeenCalledWith(applicationName)
        })

        it("should not call authenticateApplication when a token exists in session storage", async () => {
            const applicationAccessToken = 'TEST_D_STORED_ACCESS_TOKEN'
            const fakeStorage = {
                test_dAccessToken: applicationAccessToken
            }

            mockSessionStorage(fakeStorage)

            const applicationName = 'test_d'
            const accessToken = await AuthenticationService.getAccessToken(applicationName)

            expect(sessionStorage.getItem).toHaveBeenCalledTimes(1)
            expect(sessionStorage.getItem).toHaveBeenCalledWith('test_dAccessToken')
            expect(authenticateApplicationSpy).not.toHaveBeenCalled()
            expect(accessToken).toBe(applicationAccessToken)
        })
    })
})
