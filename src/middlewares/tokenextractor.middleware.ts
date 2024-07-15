import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { NOT_FOUND, UNAUTHORIZED_ACCESS } from "../utils/namespace.util";
import User from "../models/User";
import axios from "axios";
const headers = {
  headers: { "Content-Type": "text/xml" },
};
const extractJwtFromCookie = (
  req: Request<any,any,any,any>,
  res: Response,
  next: NextFunction
) => {
  console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrror')
  const path = req.path.split("/").at(-1);
  const token =
    path === "refresh" || path === "signout"
      ? req.cookies?.persist
      : req.cookies?.auth;
    console.log("🚀 ~ file: tokenextractor.middleware.ts:20 ~ token:", token)

  if (token) {
    jwt.verify(
      token,
      config.server.token.secret,
      async (error: any, decoded: any) => {
       try{
         if (error) {
          res.status(401).json({
            status: 'failed',
            message: NOT_FOUND,
          });
        } else {
          console.log('before')
          const user = await User.findById( decoded._id);
          if (!user) {
            res.status(401).json({
              status: 'failed',
              message: NOT_FOUND,
            });
          }
          res.locals.encodedToken = token;
          res.locals.decodedToken = decoded;
          res.locals.user = user;
          next();
        }
       }catch(error){
          console.log('error happened during extracting token',error)
          res.status(401).json({
            status: 'failed',
            message: NOT_FOUND,
          });
        }
      }
    );
  } else {
    res.status(401).json({
      status: 'failed',
      message: NOT_FOUND,
    });
  }
};
const extractJwtFromHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(
      token,
      config.server.token.secret,
      (error: any, decoded: any) => {
        if (error) {
          const err: any = new Error(NOT_FOUND);
          err.status = 404;
          next(err);
        } else {
          res.locals.verificationToken = decoded;
          next();
        }
      }
    );
  } else {
    const err: any = new Error(UNAUTHORIZED_ACCESS);
    err.status = 401;
    err.statusCode = 401;
    next(err);
  }
};


export {
  extractJwtFromCookie,
  extractJwtFromHeader,
};
