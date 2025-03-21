import catchAsycn from '../../utils/catAsycn';
import sendresponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const singIn = catchAsycn(async (req, res) => {
  const result = await UserService.singIn(req.body);
  sendresponse(res, 201, 'User created successfully', result);
});

const logIn = catchAsycn(async (req, res) => {
  const result = await UserService.logIn(req.body);
  res.cookie('token', result.token, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });

  sendresponse(res, 200, 'User logged in successfully', result);
});

export const UserController = {
  singIn,
  logIn,
};
