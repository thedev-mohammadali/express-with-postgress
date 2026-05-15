import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello from express",
  });
});

export default app;
