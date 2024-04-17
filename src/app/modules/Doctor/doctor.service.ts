import prisma from "../../../shared/prisma";

const updateIntoDB = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;

  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  prisma.$transaction(async (transactionClient) => {
    const updateDoctorData = await transactionClient.doctor.update({
      where: {
        id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: true,
      },
    });

    if (specialties && specialties.length > 0) {
      //------=> delete specialties <--------//
      const deletedSpecialties = specialties.filter(
        (specialty: any) => specialty.isDeleted
      );

      console.log("deletedSpecialties--=>", deletedSpecialties);

      for (const specialty of deletedSpecialties) {
        await transactionClient.doctorSpecialties.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });
      }

      //------=> create specialties <--------//
      const createdSpecialties = specialties.filter(
        (specialty: any) => !specialty.isDeleted
      );

      console.log("createdSpecialties--=>", createdSpecialties);

      for (const specialty of createdSpecialties) {
        // const createSpecialties =
        await transactionClient.doctorSpecialties.create({
          data: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });
      }
    }

    return updateDoctorData;
  });

  const result = await prisma.doctor.findUnique({
    where: {
      id: doctorInfo.id,
    },
    include: {
      doctorSpecialties: true,
    },
  });

  return result;
};

export const DoctorService = {
  updateIntoDB,
};
