import { NextFunction, Request, Response } from 'express';

import { HTTPStatusEnum } from '../enums/HTTPStatusEnum';

import CustomError from '../utils/CustomError';
import Logger from '../utils/logger';

const errorMiddleware = (error: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  let errorStatus = HTTPStatusEnum.INTERNAL_SERVER;

  if (error instanceof CustomError) {
    errorMessage = error.message;
    errorStatus = error.status;
  }

  Logger.error(errorMessage);
  res.status(errorStatus).send({ message: error.message });
};

export default errorMiddleware;
