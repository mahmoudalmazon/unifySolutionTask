import { Document, ObjectId, Schema } from 'mongoose'

export interface IUserInput {
    username: string
    email: string
    password: string
    phoneNumber: string
    imageProfile: string
    isVerified: boolean
    isDeleted: boolean
    department:ObjectId
    isActive:boolean
    wishlist: Schema.Types.ObjectId[]
    role: string
    passwordConfirmation?: string
    image?: string
    image_key?: string
}

export interface UserChangePassword {

    oldpassword: string
    newpassword: string
    confirmpassword: string
}

export interface IUserSignin {
    email: string
    password: string

}
export interface IUserVerification {
    email: string
}

export interface IUserDocument extends IUserInput, Document {
    role: string
    // fullName: string
    comparePassword(candidatePassword: string): Promise<boolean>
}
