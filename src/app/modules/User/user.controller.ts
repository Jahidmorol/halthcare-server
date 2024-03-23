import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  const result = await userService.createAdmin();

  res.status(200).json({
    success: true,
    message: "Admin Created successfully!",
    data: result,
  });
};

export const userController = {
  createAdmin,
};
