import express, { Application, Request, Response } from "express";
import cors from "cors";

export const app: Application = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Massage: "Heth Care Server...",
  });
});
