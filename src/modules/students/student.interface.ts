import { Types } from 'mongoose';

export interface IStudent {
  name: string;
  age: number;
  grade: string;
  student_photo: string;
  student_description: string;
  createdBy: Types.ObjectId;
}
