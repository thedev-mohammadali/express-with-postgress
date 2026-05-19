import { configDotenv } from "dotenv";
import path from "node:path";
import type { Expiry } from "../types";

configDotenv({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connectionString: process.env.DATABASE_URL,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  secret_refresh: process.env.JWT_SECRET_REFRESH,
  tokenExpiry: (process.env.EXPIRE_IN as Expiry) || "1d",
  rTokenExpiry: (process.env.REFRESH_EXPIRE_IN as Expiry) || "2d",
};

export default config;
