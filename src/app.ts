import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.route";
import { AdminRoutes } from "./app/modules/Admin/admin.route";

export const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", AdminRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    Massage: "Heth Care Server...",
  });
});
