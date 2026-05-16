import { pool } from "../../db";
import queryString from "../../db/queryStrings";
import type { IProfile } from "./profile.interface";

const createProfileIntoDB = async (payload: IProfile) => {
  const { user_id, bio, address, gender, phone } = payload;

  const user = await pool.query(queryString.getUserByIdQuery, [user_id]);

  if (user.rowCount === 0) {
    throw new Error(`No users found with id: ${user_id}`);
  }

  return await pool.query(queryString.createProfileQuery, [
    user_id,
    bio,
    address,
    gender,
    phone,
  ]);
};

const getProfileByIdFromDB = async (id: number) => {
  return await pool.query(queryString.getUserProfileByIdQuery, [id]);
};

export const profileService = {
  createProfileIntoDB,
  getProfileByIdFromDB,
};
