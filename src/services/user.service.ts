import { ObjectId } from "mongoose";
import {
  IUserDocument,
  IUserInput,
  UserChangePassword,
} from "../interfaces/user.interface";
// import { ErrorHandler } from "../lib/errorhandler.lib";
import { ErrorHandler } from "../lib/errorhandler.lib";
import AppError from "../utils/AppError";
import { NextFunction } from "express";
import { INVALID_CREDENTIALS, UserNotFound } from "../utils/namespace.util";
import User from "../models/User";

const create = async (payload: IUserInput, next: NextFunction) => {
  try {
    const foundUser = await User.find({
      $or: [{ email: payload.email }, { username: payload.username }],
    });
    if (foundUser.length) {
      return next(new AppError("User already exists", 400));
    }
    const user = new User(payload);
    return await user.save();
  } catch (error: any) {
    // await ErrorHandler(error);
  }
};
const CreateWithSocialMediaLogin = async (payload: any,method:string) => {
  let user ;
  try {
     user = await User.findOne({
      $and: [{ email: payload.email }, { method: method }],
    });
    if (user) {
        return user
    }
     user = await User.create({
      email:payload.email,
      isVerified:true,
      image:payload.picture,
      username:payload.name,
      method:method,
      password:payload.jti
      
      
    })
    return user 
  } catch (error) {
    await ErrorHandler(error);
  }
};

const edit = async (payload: IUserInput, user: IUserDocument) => {
  const updateOptions = {
    upsert: true,
    setDefaultsOnInsert: true,
    new: true,
  };
  try {
    const response = await User.findByIdAndUpdate(
      user._id,
      payload,
      updateOptions
    );
    console.log("🚀 ~ file: user.service.ts:43 ~ edit ~ response", response);
    return response;
  } catch (error: any) {
    console.log("🚀 ~ file: user.service.ts:49 ~ edit ~ error:", error);
    // await ErrorHandler(error)
  }
};
const toggleUserActivity = async (query: any) => {
  try {
    const { id } = query;
    const user = await User.findById(id);
    if (!user) {
      const err: any = new Error("can`t find user");
      err.status = 404;
      throw err;
    }
    user.isActive = !user.isActive;
    return await user.save();
  } catch (error) {
    await ErrorHandler(error);
  }
};
const getLoggedInUser = async (user: IUserDocument) => {
  try {
    return await User.findById(user._id).populate("apartments");
  } catch (error: any) {
    // await ErrorHandler(error)
  }
};
const getAllUsers = async () => {
  try {
    return await User.find().sort({ createdAt: -1 });
  } catch (error: any) {
    // await ErrorHandler(error)
  }
};
const DeleteUser = async (id: string) => {
  try {
    const date = await User.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!date) {
      const err: any = new Error("Can't find User");
      err.status = 404;
      throw err;
    }
    return date;
  } catch (error) {
    await ErrorHandler(error);
  }
};
const changeUserPassword = async (id: string, payload: UserChangePassword) => {
  try {
    const user = await User.findById(id).select("+password");
    if (!user) {
      const err: any = new Error(UserNotFound);
      err.status = 409;
      throw err;
    }
    const isPasswordMatch = await user.comparePassword(payload.oldpassword);
    if (!isPasswordMatch) {
      const err: any = new Error(INVALID_CREDENTIALS);
      err.status = 409;
      throw err;
    }
    user.password = payload.newpassword;
    return await user.save();
  } catch (error) {
    await ErrorHandler(error);
  }
};
export default {
  create,
  edit,
  getLoggedInUser,
  getAllUsers,
  DeleteUser,
  toggleUserActivity,
  changeUserPassword,
  CreateWithSocialMediaLogin
};
