
import jwt from 'jsonwebtoken';
import config from '../config/config';
import bcrypt from 'bcryptjs';

import { Response } from 'express';
// import cookieOptions from '../types/cookieOptions';
import { IUserDocument, IUserInput } from '../interfaces/user.interface';
import Token from '../models/token.model';
import { FORBIDDEN_ACCESS, INVALID_CREDENTIALS } from '../utils/namespace.util';
import User from '../models/User';

const signin = async (payload: IUserInput) => {
    try {
        const user = await User.findOne({
            $and: [{ $or: [{ username: payload.email }, { email: payload.email }] }]
        }).populate("wishlist").select("+password")
        
        if (!user) {
            const err: any = new Error(INVALID_CREDENTIALS)
            err.status = 409
            throw err
        }
        const isPasswordMatch = await user.comparePassword(payload.password)
        if (!isPasswordMatch) {
            const err: any = new Error(INVALID_CREDENTIALS)
            err.status = 409
            throw err
        }
        user.password = ""
        return user
    } catch (error) {
        throw error
    }
}   
    type UserDocument = IUserDocument ;
const generateAccessToken = async (user: UserDocument) => {
        try {
            return jwt.sign(
                {
                    _id: user._id
                },
                config.server.token.secret,
                {
                    issuer: config.server.token.issuer,
                    algorithm: 'HS256',
                    expiresIn: '1d'
                }
            )
        } catch (error) {
            throw error
        }
    }
const generateRefreshToken = async (user: IUserDocument) => {
        try {
            const token = jwt.sign(
                {
                    _id: user._id
                },
                config.server.token.secret,
                {
                    issuer: config.server.token.issuer,
                    algorithm: 'HS256',
                    expiresIn: '7d'
                }
            )
    
            const isRefreshTokenExist = await Token.exists({ userId: user._id })
    
            if (!isRefreshTokenExist) {
                const refreshToken = new Token()
                refreshToken.userId = user._id
                refreshToken.token = token
                await refreshToken.save()
            }
    
            return token
        } catch (error) {
            throw error
        }
    }
const generateVerificationToken = async (user: IUserDocument) => {
        try {
            const token = jwt.sign(
                {
                    _id: user._id
                },
                config.server.token.secret,
                {
                    issuer: config.server.token.issuer,
                    algorithm: 'HS256',
                    expiresIn: '15m'
                }
            )
    
            return token
        } catch (error) {
            throw error
        }
    } 
const isRefreshTokenExist = async (payload: any) => {
        try {
            const __token__ = await Token.findOne({ userId: payload.userId })
    
            if (!__token__) {
                const err: any = new Error(FORBIDDEN_ACCESS)
                err.status = 403
                throw err
            }
    
            const isTokenMatch = await __token__.compareToken(payload.token)
    
            if (!isTokenMatch) {
                // need to send email to the admin or admin should be notify if this error is triggered.
                const err: any = new Error(FORBIDDEN_ACCESS)
                err.status = 403
                throw err
            }
    
            return true
        } catch (error) {
            throw error
        }
    }
const deleteToken = async (userId: string) => {
        try {
            return await Token.deleteMany({ userId })
        } catch (error) {
            throw error
        }
    }
const verifyUser = async (_id: string) => {
        try {
            return await User.findByIdAndUpdate(_id, { isVerified: true })
        } catch (error) {
            throw error
        }
    }
// const authenticateGoogleUser =async (verificationObj: any)=> {
//         const user = await User.findOne({email:verificationObj.email})
//         if (!user) {
//             // return this.registerSocialMediaLogin(verificationObj, "google");
//             return  verificationObj
//         }
//         return user 
        
// }
// const  GoogleVerifyIdToken =  async (idToken: string) =>{
//     const  client = new OAuth2Client(config.AuthKey.goggle.ClientId);
//     try {
//         const ticket = await client.verifyIdToken({
//             idToken: idToken,
//             audience: config.AuthKey.goggle.ClientId,
//             // Specify the CLIENT_ID of the app that accesses the backend
//             // Or, if multiple clients access the backend:
//             //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//         });
//         const payload = ticket.getPayload();
//         console.log("payload",payload)
//         if(payload){
//             const userid = payload["sub"];
//             return {
//                 ...payload,
//                 userid,
//             };
//         }
//         // If request specified a G Suite domain:
//         // const domain = payload['hd'];
//     } catch (err: any) {
//         console.log("err: ", err);
//         const stringError = err?.toString();
//         const errMsg = stringError.split(":")?.trim();

//         return { error: errMsg?.length ? errMsg[1] : errMsg[0] };
//     }
// }
    export default {
        generateAccessToken,
        generateVerificationToken,
        generateRefreshToken,
        isRefreshTokenExist,
        deleteToken,
        verifyUser,
        signin,
    }