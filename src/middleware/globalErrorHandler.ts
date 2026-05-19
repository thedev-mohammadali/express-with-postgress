import { type NextFunction, type Request, type Response } from "express";
const globalErrorHanler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default globalErrorHanler;
