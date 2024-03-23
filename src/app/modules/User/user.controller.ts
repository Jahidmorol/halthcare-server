import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  const result = await userService.createAdmin(
    req.body.password,
    req.body.admin
  );

  res.status(200).json({
    success: true,
    message: "Admin Created successfully!",
    data: result,
  });
};

export const userController = {
  createAdmin,
};
