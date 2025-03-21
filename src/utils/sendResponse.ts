import { Response } from 'express';

const sendresponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any,
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export default sendresponse;
