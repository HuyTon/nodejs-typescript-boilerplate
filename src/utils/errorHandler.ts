import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error message: ${err.message}`);
  console.error(`Error stack: ${err.stack}`);
  res.status(500).send("Internal Server Error");
};

export default errorHandler;
