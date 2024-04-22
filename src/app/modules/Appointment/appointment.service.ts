import { TAuthUser } from "../../interfaces/common";

const createAppointment = async (user: TAuthUser, payload: any) => {
  console.log("appointment created", payload);
  console.log("user", user);
};

export const AppointmentService = {
  createAppointment,
};
