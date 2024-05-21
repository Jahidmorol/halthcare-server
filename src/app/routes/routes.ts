import express from "express";
import { UserRoutes } from "../modules/User/user.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { SpecialtiesRoutes } from "../modules/Specialties/specialties.route";
import { DoctorRoutes } from "../modules/Doctor/doctor.route";
import { PatientRoutes } from "../modules/Patient/patient.route";
import { ScheduleRoutes } from "../modules/Schedule/schedule.route";
import { DoctorScheduleRoutes } from "../modules/DoctorSchedule/doctorSchedule.route";
import { AppointmentRoutes } from "../modules/Appointment/appointment.route";
import { PaymentRoutes } from "../modules/Payment/payment.route";
import { PrescriptionRoutes } from "../modules/Prescription/prescription.route";
import { ReviewRoutes } from "../modules/Review/review.route";
import { MetaRoutes } from "../modules/Meta/meta.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: AuthRoutes,
  },
  {
    path: "/user",
    routes: UserRoutes,
  },
  {
    path: "/admin",
    routes: AdminRoutes,
  },
  {
    path: "/doctor",
    routes: DoctorRoutes,
  },
  {
    path: "/patient",
    routes: PatientRoutes,
  },
  {
    path: "/specialties",
    routes: SpecialtiesRoutes,
  },
  {
    path: "/schedule",
    routes: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    routes: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    routes: AppointmentRoutes,
  },
  {
    path: "/payment",
    routes: PaymentRoutes,
  },
  {
    path: "/prescription",
    routes: PrescriptionRoutes,
  },
  {
    path: "/review",
    routes: ReviewRoutes,
  },
  {
    path: "/meta",
    routes: MetaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
