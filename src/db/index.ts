import { Pool } from "pg";
import config from "../config";
import queryString from "./queryStrings";

export const pool = new Pool({
  connectionString: config.connectionString,
});

const { createUserProfileQuery, createUserTableQuery } = queryString;

export const initDB = async () => {
  try {
    await pool.query(createUserTableQuery);
    await pool.query(createUserProfileQuery);

    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
