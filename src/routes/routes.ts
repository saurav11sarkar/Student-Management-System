import express from 'express';
import { userRoutes } from '../modules/users/user.routes';
import { studentRoutes } from '../modules/students/student.routes';
const router = express.Router();

router.use(userRoutes);
router.use('/students', studentRoutes);

export default router;
