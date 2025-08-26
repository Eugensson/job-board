"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/require-user";
import { companySchema } from "@/app/utils/zodSchemas";

export const createCompany = async (data: z.infer<typeof companySchema>) => {
  const session = await requireUser();

  const validatedData = companySchema.parse(data);

  await prisma.user.update({
    where: {
      id: session.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      company: {
        create: {
          ...validatedData,
        },
      },
    },
  });

  return redirect("/");
};
