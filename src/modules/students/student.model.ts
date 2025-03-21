import mongoose from 'mongoose';
import { IStudent } from './student.interface';

const studentSchema = new mongoose.Schema<IStudent>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    grade: {
      type: String,
      required: [true, 'Grade is required'],
    },
    student_photo: {
      type: String,
      required: [true, 'Photo is required'],
    },
    student_description: {
      type: String,
      required: [true, 'Description is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'CreatedBy id is required'],
    },
  },
  { timestamps: true },
);

const Student = mongoose.model<IStudent>('Student', studentSchema);
export default Student;
