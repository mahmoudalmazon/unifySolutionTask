import express from 'express'
import { ParamsValidator, RequestValidator, Schemas } from '../middlewares/requestvalidator.middleware';
import adminController from '../controllers/admin.controller';
const router = express.Router();

// router.post('/create',RequestValidator(Schemas.user.create),userController.create);
router.put("/unactive/:id",ParamsValidator(Schemas.user.unactive),adminController.UnActiveUser)
export default  router;