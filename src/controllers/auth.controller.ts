// const User = require('../models/User');
// const Team = require('../models/Team');
// const Player = require('../models/Player');
// const userValidation = require('../validations/userValidation');
// const { promisify } = require('util');
import AppError from '../utils/AppError';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import * as crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import CookieOptions from '../types/cookieOptions';
import config from '../config/config';
import authService from '../services/auth.service';
import userService from '../services/user.service';

const signin = async (req: Request, res: Response, next: NextFunction) => {
    await authService
        .signin(req.body)
        .then(async (data: any) => {
            const accessToken = await authService.generateAccessToken(data)
            const refreshToken = await authService.generateRefreshToken(data)
            console.log(data)
            return res
                .cookie('auth', accessToken, {
                    // secure: true,
                    // signed: true,
                    // httpOnly: true,
                    maxAge:  7 * 24 * 60 * 60 * 1000,
                    // domain: config.server.cookie.domain
                })
                .cookie('persist', refreshToken, {
                    // secure: true,
                    // signed: true,
                    // httpOnly: true,
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    // domain: config.server.cookie.domain
                })
                .status(200)
                .send({user:data})
        })
        .catch((err) => next(err))
}
const refresh = async (req: Request, res: Response, next: NextFunction) => {
    await authService
        .isRefreshTokenExist({ token: res.locals.encodedToken, userId: res.locals.decodedToken })
        .then(async (isExist) => {
            if (isExist) {
                const accessToken = await authService.generateAccessToken(res.locals.decodedToken)

                return res
                    .cookie('auth', accessToken, {
                        secure: true,
                        signed: true,
                        httpOnly: true,
                        maxAge: 60 * 1000 ,
                        domain: config.server.cookie.domain
                    })
                    .status(200)
                    .send()
            }
        })
        .catch((err) => next(err))
}

export default {
    signin,
    refresh,
 
}