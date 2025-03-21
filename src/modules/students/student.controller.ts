import catchAsycn from '../../utils/catAsycn';
import sendresponse from '../../utils/sendResponse';
import { studentService } from './student.service';

const createStudent = catchAsycn(async (req, res) => {
  const result = await studentService.createStudent(req.body);
  sendresponse(res, 201, 'Student created successfully', result);
});
const getAllStudents = catchAsycn(async (req, res) => {
  const result = await studentService.getAllStudents(req, req.query);
  sendresponse(res, 200, 'Students retrieved successfully', result);
});
const getSingleStudent = catchAsycn(async (req, res) => {
  const result = await studentService.getSingleStudent(req, req.params.id);
  sendresponse(res, 200, 'Student retrieved successfully', result);
});

const updateStudent = catchAsycn(async (req, res) => {
  const result = await studentService.updateStudent(
    req,
    req.params.id,
    req.body,
  );
  sendresponse(res, 200, 'Student updated successfully', result);
});

const deleteStudent = catchAsycn(async (req, res) => {
  const result = await studentService.deleteStudent(req, req.params.id);
  sendresponse(res, 200, 'Student deleted successfully', result);
});

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
