import { ObjectId } from "mongoose";
import Joi, { ObjectSchema, object, string } from "joi";
import { NextFunction, Request, Response } from "express";

import {
  IUserSignin,
  IUserInput,
  IUserVerification,
} from "../interfaces/user.interface";


export const RequestValidator = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      // const err: any = new Error(error)
      const err: any = new Error(error.details[0].message);
      err.status = 422;
      next(err);
    }
  };
};

export const QueryValidator = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (error: any) {
      const err: any = new Error(error.details[0].message);
      err.status = 422;
      next(err);
    }
  };
};

export const ParamsValidator = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.params);
      next();
    } catch (error: any) {
      const err: any = new Error(error.details[0].message);
      err.status = 422;
      next(err);
    }
  };
};

export const Schemas = {
  auth: {
    signin: Joi.object<IUserSignin>({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
    googleSignIn: Joi.object({
      idToken: Joi.string().required(),
    }),
    sendVerification: Joi.object<IUserVerification>({
      email: Joi.string().required(),
      // type: Joi.string().valid('verify', 'reset').required()
    }),
    confirmAndModifyPassword: Joi.object<IUserSignin>({
      password: Joi.string().required(),
    }),
  },


  user: {
    create: Joi.object<IUserInput>({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().optional(),
      passwordConfirmation: Joi.any().valid(Joi.ref("password")),
      role: Joi.string().valid("user", "admin", "supervisor").optional(),
      imageProfile: Joi.string().optional(),
      image: Joi.string().optional(),
      image_key: Joi.string().optional(),
    }),
    edit: Joi.object<IUserInput>({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().optional(),
      image: Joi.string().optional(),
      image_key: Joi.string().optional(),
    }),
    unactive: Joi.object({
      id: Joi.string().required(),
    }),
    changepassword: Joi.object({
      oldpassword: Joi.string().required(),
      newpassword: Joi.string().required(),
      confirmPassword: Joi.valid(Joi.ref("newpassword")).required(),
    }),
  },


};
