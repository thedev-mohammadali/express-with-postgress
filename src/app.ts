import express, { type Application } from "express";
import { userRoute } from "./modules/user/user.route";

const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello from express",
  });
});

app.use("/api/users", userRoute);

// app.get("/users", (req: Request<{}, {}, {}, Query>, res: Response) => {
//   const queries = req.query;

//   res.json({
//     age: queries.age ?? "Not defined",
//     name: queries.name,
//   });
// });

export default app;
