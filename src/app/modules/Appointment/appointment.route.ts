import express from "express";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { AppointmentController } from "./appointment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AppointmentValidation } from "./appointment.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(AppointmentValidation.createAppointment),
  AppointmentController.createAppointment
);

router.get(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentController.getMyAppointment
);

router.get(
  "/",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  AppointmentController.getAllFromDB
);

router.patch(
  "/status/:id",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  AppointmentController.changeAppointmentStatus
);

export const AppointmentRoutes = router;
