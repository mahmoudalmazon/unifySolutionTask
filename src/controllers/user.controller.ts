import { Request, Response, NextFunction } from "express";
import {
  IUserDocument,
  IUserInput,
  UserChangePassword,
} from "../interfaces/user.interface";
import userService from "../services/user.service";
import { ObjectId } from "mongoose";
import authService from "../services/auth.service";
import { ErrorHandler } from "../lib/errorhandler.lib";
const create = async (
  req: Request<{}, {}, IUserInput, {}>,
  res: Response,
  next: NextFunction
) => {
  await userService
    .create(req.body, next)
    .then(async (data: any) => {
      // await authService.sendVerification(data, 'verify')
      return res.status(201).send({ user: data });
    })
    .catch((err) => next(err));
  // await userService.create(req.body,next);
};

const edit = async (
  req: Request<{}, {}, IUserInput, {}>,
  res: Response,
  next: NextFunction
) => {
  await userService
    .edit(req.body, res.locals.decodedToken)
    .then(async (data) => {
      return res.status(200).send({ user: data });
    })
    .catch((err) => next(err));
};
const getLoggedInUser = async (
  req: Request<{}, {}, IUserInput, {}>,
  res: Response,
  next: NextFunction
) => {
  await userService
    .getLoggedInUser(res.locals.decodedToken)
    .then(async (data) => {
      return res.status(200).send(data);
    })
    .catch((err) => next(err));
};
const toggleUserActivity = async (
  req: Request<{}, {}, {}, any>,
  res: Response,
  next: NextFunction
) => {
  await userService
    .toggleUserActivity(req.params)
    .then(async (data) => {
      return res.status(200).send(data);
    })
    .catch((err) => next(err));
};
const getAllUsers = async (
  req: Request<{}, {}, IUserInput, {}>,
  res: Response,
  next: NextFunction
) => {
  await userService
    .getAllUsers()
    .then(async (data) => {
      return res.status(200).send({ users: data });
    })
    .catch((err) => next(err));
};


const DeleteUser = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.DeleteUser(req.params.id);
    res.status(204).json({ status: "success" });
  } catch (error) {
    await ErrorHandler(error);
  }
};
const changeUserPassword = async (
  req: Request<{}, {}, UserChangePassword, {}>,
  res: Response,
  next: NextFunction
) => {
  const id = res.locals.decodedToken._id;
  try {
    const updatedUser = await userService.changeUserPassword(id, req.body);
    res.status(203).json({ update: "success" });
  } catch (error) {
    next(error);
  }
};
export default {
  toggleUserActivity,
  create,
  edit,
  getLoggedInUser,
  getAllUsers,
  DeleteUser,
  changeUserPassword,
};
