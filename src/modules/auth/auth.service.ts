import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../db";
import queryString from "../../db/queryStrings";
import type { ICredential, IUserDataResponse } from "./auth.interface";

const loginUserIntoDB = async (payload: ICredential) => {
  //passed data into body when trying to login
  const { email, password } = payload;

  //Get user data from DB using email.
  const userData = await pool.query(queryString.getUserByEmailQuery, [email]);

  //Check if user exists
  const user = userData.rows[0] as IUserDataResponse;

  if (userData.rowCount === 0) {
    throw new Error("Invalid Credentials!");
  }

  //Compare password
  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new Error("Invalid Credentials!");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const authService = {
  loginUserIntoDB,
};
