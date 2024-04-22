import { addHours, format } from "date-fns";

const insertIntoDB = async (payload: any) => {
  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);

  while (startDate <= endDate) {
    const startDateTime = new Date(
      addHours(
        `${format(startDate, "yyyy-MM-dd")}`,
        Number(payload.startTime.spilt(":")[0])
      )
    );

    const endDateTime = new Date(
      addHours(
        `${format(endDate, "yyyy-MM-dd")}`,
        Number(payload.endTime.spilt(":")[0])
      )
    );

    while (startDateTime <= endDateTime) {
      // next module.
    }
  }
};

export const ScheduleService = {
  insertIntoDB,
};
