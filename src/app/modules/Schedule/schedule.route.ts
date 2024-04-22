import express from "express";
import { ScheduleController } from "./schedule.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  ScheduleController.insertIntoDB
);

router.get("/", auth(UserRole.DOCTOR), ScheduleController.getAllFromDB);

router.get(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleController.getByIdFromDB
);

router.delete(
  "/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  ScheduleController.deleteFromDB
);

export const ScheduleRoutes = router;
