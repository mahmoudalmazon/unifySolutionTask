import { UNKNOWN, INVALID_IMEI_OR_SERVICE_NUMBER, NO_USER_FOUND, LOW_FUNDS } from '../utils/namespace.util'

// Mostly used in services
export const ErrorHandler = async (error: any) => {
    // console.log(error.message)
    console.log(error)
    switch (true) {
        case error.name === 'MongoServerError' && error.code === 11000: {
            const err: any = new Error(error.message)
            err.status = 409
            throw err
        }

        case error.name === 'ValidationError': {
            const err: any = new Error(error.message)
            err.status = 409
            throw err
        }

        case error.message === 'failed' || error.message === 'rejected': {
            const err: any = new Error(INVALID_IMEI_OR_SERVICE_NUMBER)
            err.status = 400
            throw err
        }

        case error.message === 'NO_USER_FOUND': {
            const err: any = new Error(NO_USER_FOUND)
            err.status = 409
            throw err
        }

        case error.message === 'LOW_FUNDS': {
            const err: any = new Error(LOW_FUNDS)
            err.status = 409
            throw err
        }

        default: {
            const err: any = new Error(UNKNOWN)
            err.status = 500
            throw err
        }
    }
}
