import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
