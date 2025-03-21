import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import configs from '../configs';
import User from '../modules/users/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const auth = (request: string[] | string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.token;
      if (!token) throw new Error('Token is not define');

      const decoded = jwt.verify(
        token,
        configs.JWT_SECRET as string,
      ) as JwtPayload;

      const { email, role } = decoded;
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid token: User not found');

      if (Array.isArray(request)) {
        if (!request.includes(role)) throw new Error('You are not authorized');
      }
      if (typeof request === 'string') {
        if (request !== role) throw new Error('You are not authorized');
      }
      req.user = decoded as JwtPayload;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
