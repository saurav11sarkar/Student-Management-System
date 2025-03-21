import express from 'express';
import auth from '../../middleware/auth';
import { studentController } from './student.controller';
import requestValidation from '../../middleware/requestValidation';
import { studentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/',
  auth(['admin', 'teacher']),
  requestValidation(studentValidation.studentSchema),
  studentController.createStudent,
);
router.get('/', auth(['admin', 'teacher']), studentController.getAllStudents);
router.get(
  '/:id',
  auth(['admin', 'teacher']),
  studentController.getSingleStudent,
);
router.put(
  '/:id',
  auth(['admin', 'teacher']),
  requestValidation(studentValidation.updateStudentSchema),
  studentController.updateStudent,
);
router.delete(
  '/:id',
  auth(['admin', 'teacher']),
  studentController.deleteStudent,
);

export const studentRoutes = router;
