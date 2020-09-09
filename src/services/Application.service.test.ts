jest.mock('./Authentication.service', () => ({
    getAccessToken: jest.fn().mockResolvedValue('STORED_ACCESS_TOKEN'),
}))

import * as ApplicationService from "./Application.service"
import * as AuthenticationService from "./Authentication.service"

describe("Application service", () => {

    describe('hello', () => {
        it("With authentication", async () => {
            const getAccessTokenSpy = jest.spyOn(AuthenticationService, 'getAccessToken')
            const policyResponse = await ApplicationService.hello()

            expect(policyResponse).toHaveProperty('data')
            expect(getAccessTokenSpy).toHaveBeenCalledTimes(1)
            expect(getAccessTokenSpy).toHaveBeenCalledWith('application')
        })
    })
})
