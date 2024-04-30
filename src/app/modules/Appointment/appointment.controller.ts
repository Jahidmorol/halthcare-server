import { Request } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TAuthUser } from "../../interfaces/common";
import { AppointmentService } from "./appointment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { pick } from "../../../shared/pick";

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

const getMyAppointment = catchAsync(
  async (req: Request & { user?: TAuthUser }, res) => {
    const user = req.user;
    const filters = pick(req.query, ["status", "paymentStatus"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await AppointmentService.getMyAppointment(
      user as TAuthUser,
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Appointment retrieve successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
  getMyAppointment,
};
