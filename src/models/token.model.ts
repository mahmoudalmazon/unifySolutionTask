import mongoose, {Schema}from 'mongoose'
import bcrypt from 'bcryptjs'

import { ITokenDocument } from '../interfaces/token.interface'

const TokenSchema: Schema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        
        token: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        id: false
    }
)

TokenSchema.pre('save', async function (this: ITokenDocument, next: any) {
    if (!this.isModified('token')) return next()

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hashSync(this.token, salt)

    this.token = hash

    return next()
})

TokenSchema.methods.compareToken = async function (token: string): Promise<boolean> {
    const jwt = this as ITokenDocument

    return bcrypt.compare(token, jwt.token).catch((err: any) => false)
}
const Token =  mongoose.model<ITokenDocument>('Token', TokenSchema)
export default Token