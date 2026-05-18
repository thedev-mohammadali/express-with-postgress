import express, { type Application } from "express";
import { logger } from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.route";
import { profileRoute } from "./modules/profile/profile.route";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.json({
    message: "Hello from express",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profiles", profileRoute);
app.use("/api/auth", authRoute);

// app.get("/users", (req: Request<{}, {}, {}, Query>, res: Response) => {
//   const queries = req.query;

//   res.json({
//     age: queries.age ?? "Not defined",
//     name: queries.name,
//   });
// });

export default app;
