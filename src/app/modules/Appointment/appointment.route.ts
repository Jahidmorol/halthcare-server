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

export const AppointmentRoutes = router;
