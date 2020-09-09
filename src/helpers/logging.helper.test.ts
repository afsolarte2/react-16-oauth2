import {missingEnvVarError} from './logging.helper'

const consoleLogMock = jest.spyOn(console, 'error').mockImplementation(() => {})

describe('Logging helper', () => {
    afterAll(() => {
        consoleLogMock.mockRestore()
    })

    describe('missingEnvVarError', () => {
        it('shoud call console.error one time and with the stabilished error message', () => {
            missingEnvVarError('TESTENV')

            expect(consoleLogMock).toHaveBeenCalledTimes(1)
            expect(consoleLogMock).toHaveBeenCalledWith('Missing TESTENV environment variable')
        })
    })
})
