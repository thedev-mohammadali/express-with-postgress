import { configDotenv } from "dotenv";
import path from "node:path";

configDotenv({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connectionString: process.env.DATABASE_URL,
  port: process.env.PORT,
  secret: process.env.JWT_SECRET,
  secret_refresh: process.env.JWT_SECRET_REFRESH,
  tokenExpiry: process.env.EXPIER_IN as string,
};

export default config;
