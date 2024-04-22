import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma";
import { TSchedule } from "./schedule.interface";
import { Schedule } from "@prisma/client";

const insertIntoDB = async (payload: TSchedule): Promise<Schedule[] | null> => {
  const schedules = [];

  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);

  while (startDate <= endDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(startDate, "yyyy-MM-dd")}`,
          Number(payload.startTime.split(":")[0])
        ),
        Number(payload.startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(startDate, "yyyy-MM-dd")}`,
          Number(payload.endTime.split(":")[0])
        ),
        Number(payload.endTime.split(":")[1])
      )
    );

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime,
        endDateTime: addMinutes(startDateTime, 30),
      };

      const existSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!existSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });

        schedules.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + 30);
    }

    startDate.setDate(startDate.getDate() + 1);
  }
  return schedules;
};

export const ScheduleService = {
  insertIntoDB,
};
