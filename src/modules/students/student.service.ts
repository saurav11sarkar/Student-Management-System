import { Request } from 'express';
import { IStudent } from './student.interface';
import Student from './student.model';
import QueryBuilder from '../../builder/queryBuilder';

const createStudent = async (payload: IStudent) => {
  const result = await Student.create(payload);
  return result;
};

const getAllStudents = async (req: Request, query: Record<string, unknown>) => {
  if (!req.user) throw new Error('You are not authorized');
  const queryRole =
    req.user?.role === 'admin' ? {} : { createdBy: req.user?._id };

  const queryBuilder = new QueryBuilder(Student, { ...query, ...queryRole });

  await queryBuilder
    .search(['name', 'grade', 'student_description'])
    .filter()
    .sort()
    .paginate();

  const { result, total, totalPage } = await queryBuilder.fields().build();

  return { total, totalPage, result };
};

const getSingleStudent = async (req: Request, id: string) => {
  if (!req.user) throw new Error('You are not authorized');
  const student = await Student.findById(id);
  if (!student) throw new Error('Student not found');

  if (
    req.user.role !== 'admin' &&
    student.createdBy.toString() !== req.user._id.toString()
  ) {
    throw new Error('Forbidden');
  }

  return student;
};

const updateStudent = async (
  req: Request,
  id: string,
  payload: Partial<IStudent>,
) => {
  if (!req.user) throw new Error('You are not authorized');
  const student = await Student.findById(id);
  if (!student) throw new Error('Student not found');
  if (
    req.user.role !== 'admin' &&
    student.createdBy.toString() !== req.user._id.toString()
  ) {
    throw new Error('Forbidden');
  }

  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudent = async (req: Request, id: string) => {
  if (!req.user) throw new Error('You are not authorized');
  const student = await Student.findById(id);
  if (!student) throw new Error('Student not found');
  if (
    req.user.role !== 'admin' &&
    student.createdBy.toString() !== req.user._id.toString()
  ) {
    throw new Error('Forbidden');
  }

  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const studentService = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
