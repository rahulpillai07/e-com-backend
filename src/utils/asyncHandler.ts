import { Request, Response, NextFunction } from 'express';

const asyncHandler = (returnHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(returnHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
