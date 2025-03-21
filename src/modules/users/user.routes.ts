import express from 'express';
import requestValidation from '../../middleware/requestValidation';
import { userValidation } from './user.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/singin',
  requestValidation(userValidation.userSchema),
  UserController.singIn,
);
router.post(
  '/login',
  requestValidation(userValidation.loginSchema),
  UserController.logIn,
);

export const userRoutes = router;
