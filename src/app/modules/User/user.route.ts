import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { userValidation } from "./user.validation";
import { fileUploader } from "../../../helpers/fileUploader";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-admin",
  // auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  }
);

router.post(
  "/create-doctor",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createDoctor.parse(JSON.parse(req.body.data));
    return userController.createDoctor(req, res, next);
  }
);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createPatient.parse(JSON.parse(req.body.data));
    return userController.createPatient(req, res, next);
  }
);

router.get(
  "/",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  userController.getAllFromDB
);

router.patch(
  "/:id/status",
  auth(UserRole.SUPPER_ADMIN, UserRole.ADMIN),
  validateRequest(userValidation.updateStatus),
  userController.changeProfileStatus
);

router.get(
  "/me",
  auth(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT,
    UserRole.SUPPER_ADMIN
  ),
  userController.getMyProfile
);

router.patch(
  "/update-my-profile",
  auth(
    UserRole.SUPPER_ADMIN,
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.PATIENT
  ),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.updateMyProfile(req, res, next);
  }
);

export const UserRoutes = router;
