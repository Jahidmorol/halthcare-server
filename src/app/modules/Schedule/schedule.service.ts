import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (payload: any) => {
  // console.log("schedule--=>", payload);

  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);
  // const startTime = payload.startTime;
  // const endTime = payload.endTime;

  while (startDate <= endDate) {
    const startDateTime = new Date(
      addHours(
        `${format(startDate, "yyyy-MM-dd")}`,
        Number(payload.startTime.split(":")[0])
      )
    );

    const endDateTime = new Date(
      addHours(
        `${format(startDate, "yyyy-MM-dd")}`,
        Number(payload.endTime.split(":")[0])
      )
    );

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime,
        endDateTime: addMinutes(startDateTime, 30),
      };

      // const result = prisma.schedule.create({
      //   data: scheduleData,
      // });

      console.log(scheduleData);
      startDateTime.setMinutes(startDateTime.getMinutes() + 30);
    }

    startDate.setDate(startDate.getDate() + 1);
  }
};

export const ScheduleService = {
  insertIntoDB,
};
