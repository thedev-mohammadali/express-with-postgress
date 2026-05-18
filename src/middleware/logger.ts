import type { NextFunction, Request, Response } from "express";
import { appendFile } from "node:fs";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const log = `\nMethod -> ${req.method} - Time -> ${Date.now()} - URL -> ${req.url}\n`;
  appendFile("logger.txt", log, (err) => {});
  next();
};
