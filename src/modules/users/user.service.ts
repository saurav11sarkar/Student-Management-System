import configs from '../../configs';
import { IUser } from './user.interface';
import User from './user.model';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';

const singIn = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const logIn = async (payload: IUser) => {
  const user = await User.findOne({ username: payload.username }).select(
    '+password',
  );
  if (!user) throw new Error('User not found');
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) throw new Error('Password not match');
  const { _id, username, role } = user.toObject();
  const token = jwt.sign(
    { _id, username, role },
    configs.JWT_SECRET as string,
    { expiresIn: '1d' },
  );

  const { password: _, ...result } = user.toObject();
  return { token, result };
};

export const UserService = {
  singIn,
  logIn,
};
