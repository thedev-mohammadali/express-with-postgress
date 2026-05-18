import bcrypt from "bcrypt";
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

  return [user.email, user.id];
};

export const authService = {
  loginUserIntoDB,
};
