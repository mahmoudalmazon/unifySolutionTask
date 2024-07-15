import { Document } from 'mongoose'

export interface ITokenDocument extends Document {
    userId: string
    token: string
    compareToken(token: string): Promise<boolean>
}
