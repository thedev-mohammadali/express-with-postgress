import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import queryString from "../db/queryStrings";
import type {
  IjwtDecoded,
  IUserDataResponse,
} from "../modules/auth/auth.interface";
import type { Role } from "../types";

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!",
        });
      }

      //Get the payload data by verifying the jwt token.
      const decoded = jwt.verify(token, config.secret as string) as IjwtDecoded;

      const userData = await pool.query(queryString.getUserByEmailQuery, [
        decoded.email,
      ]);

      const user = userData.rows[0] as IUserDataResponse;

      if (userData.rowCount === 0) {
        return res.status(401).json({
          success: false,
          message: "User not found!",
        });
      }

      if (!user.is_active) {
        return res.status(403).json({
          success: false,
          message: "Access Forbidden!",
        });
      }

      if (roles.length && !roles.includes(user.role)) {
        res.status(403).json({
          success: false,
          message: "Unauthorize access!!",
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
