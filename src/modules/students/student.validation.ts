import { z } from 'zod';

const studentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(1, 'Age is required'),
  grade: z.string().min(1, 'Grade is required'),
  student_photo: z.string().url('Invalid photo URL'),
  student_description: z.string().min(1, 'Description is required'),
  createdBy: z.string().min(1, 'CreatedBy ID is required'),
});

const updateStudentSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  age: z.number().min(1, 'Age is required').optional(),
  grade: z.string().min(1, 'Grade is required').optional(),
  student_photo: z.string().url('Invalid photo URL').optional(),
  student_description: z.string().min(1, 'Description is required').optional(),
  createdBy: z.string().min(1, 'CreatedBy ID is required').optional(),
});

export const studentValidation = {
  studentSchema,
  updateStudentSchema,
};
