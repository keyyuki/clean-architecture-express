import { Request, Response, Errback, NextFunction } from "express";

export function errorHandlerMiddleware(
  error: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: "System error",
  });
}
