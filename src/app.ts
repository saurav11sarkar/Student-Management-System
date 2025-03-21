import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import configs from './configs';
import router from './routes/routes';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// application routes
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<h2 style="color: red; text-align: center">Server is Running ✨ please read the readme file</h2>',
    );
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errorMessages: [
      {
        path: err.path || req.path,
        message: err.message || 'Something went wrong',
      },
    ],
    stack: configs.ENV !== 'production' ? err.stack : undefined,
  });
});

export default app;
