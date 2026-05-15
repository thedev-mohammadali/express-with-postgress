import { pool } from "../../db";
import queryString from "../../db/queryStrings";
import type { IUser } from "../../moduels/user/user.interface";

const { getAllUsersQuery, createUserQuery, getUserByIdQuery } = queryString;

const createUserIntoDB = async (payload: IUser) => {
  const { name, age, email, password } = payload;
  return await pool.query(createUserQuery, [name, email, password, age]);
};

const getAllUsersFromDB = async () => {
  return await pool.query(getAllUsersQuery);
};

const getUserByIdFromDB = async (id: string) => {
  return await pool.query(getUserByIdQuery, [id]);
};

const deleteUserByIdFromDB = async (id: string) => {
  return await pool.query(queryString.deleteUserByIdQuery, [id]);
};

const updateUserByIdIntoDB = async (
  id: string,
  payload: Partial<Omit<IUser, "email">>,
) => {
  const { name, age, is_active, password } = payload;
  return await pool.query(queryString.updateUserByIdQuery, [
    name,
    age,
    is_active,
    password,
    id,
  ]);
};

export const userService = {
  getAllUsersFromDB,
  createUserIntoDB,
  getUserByIdFromDB,
  deleteUserByIdFromDB,
  updateUserByIdIntoDB,
};
