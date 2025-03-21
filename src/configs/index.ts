import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/student-management',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  ROUNDS: process.env.SALT_ROUNDS,
  ENV: process.env.NODE_ENV,
};
