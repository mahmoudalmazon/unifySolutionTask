import { Request, Response, NextFunction } from "express";
import AdminService from "../services/Admin.service";

const UnActiveUser = async (
    req: Request<{ id:string}, {},{}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    await AdminService
      .UnActiveUser(req.params.id)
      .then(async (data) => {
        return res.status(202).send(); 
      })
      .catch((err) => next(err));
  };
  export default {  UnActiveUser };