import { Request } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TAuthUser } from "../../interfaces/common";
import { AppointmentService } from "./appointment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAppointment = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const user = req.user as TAuthUser;
    const result = await AppointmentService.createAppointment(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment booked successfully!",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
};
