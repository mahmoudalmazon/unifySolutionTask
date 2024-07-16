import { ObjectId } from "mongoose";
import Joi, { ObjectSchema, object, string } from "joi";
import { NextFunction, Request, Response } from "express";


import { IMagicMoverInput } from "../interfaces/magic-mover.interface";
import { IMagicItemInput } from "../interfaces/magic-item.interface";


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
  mover:{
    create: Joi.object<IMagicMoverInput>({
      name: Joi.string().required(),
      weightLimit: Joi.number().required(),
    }),
    startmission: Joi.object({
      magicMoverId: Joi.string().required(),
    }),
    endmission: Joi.object({
      magicMoverId: Joi.string().required(),
    }),
  },
  item:{
    create: Joi.object<IMagicItemInput>({
      name: Joi.string().required(),
      weight: Joi.number().required(),
  })
  },
};
