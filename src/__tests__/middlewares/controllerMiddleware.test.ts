import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../middlewares/controllerMiddleware';

// Mock Request, Response, and NextFunction
const mockRequest = () => {
  return {} as Request;
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

const mockNext = jest.fn() as NextFunction;

describe('asyncHandler', () => {
  it('should handle a resolved promise', async () => {
    const handler = jest.fn().mockResolvedValue('resolved');
    const wrappedHandler = asyncHandler(handler);

    await wrappedHandler(mockRequest(), mockResponse(), mockNext);

    expect(handler).toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle a rejected promise', async () => {
    const error = new Error('Test Error');
    const handler = jest.fn().mockRejectedValue(error);
    const wrappedHandler = asyncHandler(handler);

    await wrappedHandler(mockRequest(), mockResponse(), mockNext);

    expect(handler).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
