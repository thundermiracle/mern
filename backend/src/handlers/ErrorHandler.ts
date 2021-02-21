import { NextFunction, Request, Response } from "express";

export default function ErrorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  response.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });

  next();
}
