import mongoose from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcryptjs';
import configs from '../../configs';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'user name is requried'],
      unique: true,
      trim: true,
      minlength: [3, 'user name must be at least 3 characters'],
      maxlength: [20, 'user name must be at most 20 characters'],
    },
    password: {
      type: String,
      required: [true, 'password is requried'],
      select: 0,
      trim: true,
      minlength: [6, 'password must be at least 6 characters'],
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['admin', 'teacher'],
        message: '{VALUE} is not a valid role',
      },
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(configs.ROUNDS));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '⭐⭐⭐';
  next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
