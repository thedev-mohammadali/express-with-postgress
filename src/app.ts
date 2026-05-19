import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application } from "express";
import config from "./config";
import globalErrorHanler from "./middleware/globalErrorHandler";
import { logger } from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.route";
import { profileRoute } from "./modules/profile/profile.route";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(logger);

app.use(
  cors({
    origin: `http://localhost:${config.port}`,
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello from express",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profiles", profileRoute);
app.use("/api/auth", authRoute);

app.use(globalErrorHanler);

// app.get("/users", (req: Request<{}, {}, {}, Query>, res: Response) => {
//   const queries = req.query;

//   res.json({
//     age: queries.age ?? "Not defined",
//     name: queries.name,
//   });
// });

export default app;
