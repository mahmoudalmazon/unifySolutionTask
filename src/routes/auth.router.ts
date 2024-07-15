
import express from 'express'

import { RequestValidator, Schemas } from '../middlewares/requestvalidator.middleware';
import authController from '../controllers/auth.controller';


const router = express.Router();

router.post('/login',RequestValidator(Schemas.auth.signin),authController.signin)


export default  router;
