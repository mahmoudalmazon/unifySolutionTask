import express from 'express'
import { ParamsValidator, RequestValidator, Schemas } from '../middlewares/requestvalidator.middleware';
import authController from '../controllers/auth.controller';
import userController from '../controllers/user.controller';
import { extractJwtFromCookie } from '../middlewares/tokenextractor.middleware';
const router = express.Router();

// router.post('/create',RequestValidator(Schemas.user.create),userController.create);

router.get('/',extractJwtFromCookie,userController.getAllUsers);
router.get('/me',extractJwtFromCookie,  userController.getLoggedInUser);
router.post("/create",RequestValidator(Schemas.user.create),userController.create)
router.delete("/:id",extractJwtFromCookie,userController.DeleteUser);
router.patch("/changepassword",RequestValidator(Schemas.user.changepassword),extractJwtFromCookie,userController.changeUserPassword);
router.patch("/:id",extractJwtFromCookie,userController.edit);
router.patch("/:id/activity",extractJwtFromCookie,userController.toggleUserActivity);



export default  router;

// router.post('/forgotPassword', authController.forgotPassword);
// router.post('/forgotPassword', authController.forgotPassword);
// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// router.use(authController.protect);
// // all underlying routes are protected because they pass through protect middleware
// router.patch('/updateMyPassword', authController.updatePassword);


// router.patch('/updateMe', userController.updateMe);
// router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));
// // only admins can do the below routes and middlewares
//     .post(userController.createUser);

// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

// nested routing for

