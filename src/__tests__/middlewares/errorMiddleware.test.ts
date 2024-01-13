import { Request, Response, NextFunction } from 'express';

import errorMiddleware from '../../middlewares/errorMiddleware';
import { CustomError } from '../../utils/CustomErrors';
import Logger from '../../utils/logger';
import { HTTPStatusEnum } from '../../enums/HTTPStatusEnum';

jest.mock('../../utils/logger', () => ({
  error: jest.fn(),
}));

const mockRequest = {} as Request;
const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.send = jest.fn();
  return res;
};
const mockNext = jest.fn() as NextFunction;

describe('errorMiddleware', () => {
  it('should handle CustomError', () => {
    const customError = new CustomError('Custom error message', HTTPStatusEnum.BAD_REQUEST);
    const res = mockResponse();

    errorMiddleware(customError, mockRequest, res, mockNext);

    expect(Logger.error).toHaveBeenCalledWith('Custom error message');
    expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.BAD_REQUEST);
    expect(res.send).toHaveBeenCalledWith({ message: 'Custom error message' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle generic Error', () => {
    const genericError = new Error('Generic error message');
    const res = mockResponse();

    errorMiddleware(genericError, mockRequest, res, mockNext);

    expect(Logger.error).toHaveBeenCalledWith('An unknown error occurred');
    expect(res.status).toHaveBeenCalledWith(HTTPStatusEnum.INTERNAL_SERVER);
    expect(res.send).toHaveBeenCalledWith({ message: 'Generic error message' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
