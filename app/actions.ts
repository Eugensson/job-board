"use server";

import { z } from "zod";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";

import {
  companySchema,
  jobSchema,
  jobSeekerSchema,
} from "@/app/utils/zodSchemas";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/require-user";
import arcjet, { detectBot, shield } from "@/app/utils/arcjet";

const aj = arcjet
  .withRule(shield({ mode: "LIVE" }))
  .withRule(detectBot({ mode: "LIVE", allow: [] }));

export const createCompany = async (data: z.infer<typeof companySchema>) => {
  const session = await requireUser();

  // const req = await request();

  // if (req.method !== "POST") {
  //   return redirect("/");
  // }

  // const decision = await aj.protect(req);

  // if (decision.isDenied()) {
  //   throw new Error("Forbidden");
  // }

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

export const createJobSeeker = async (
  data: z.infer<typeof jobSeekerSchema>
) => {
  const user = await requireUser();

  const req = await request();

  if (req.method !== "POST") {
    return redirect("/");
  }

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validatedData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      jobSeeker: {
        create: {
          ...validatedData,
        },
      },
    },
  });

  return redirect("/");
};

export const createJob = async (data: z.infer<typeof jobSchema>) => {
  const user = await requireUser();

  // const req = await request();

  // if (req.method !== "POST") {
  //   return redirect("/");
  // }

  // const decision = await aj.protect(req);

  // if (decision.isDenied()) {
  //   throw new Error("Forbidden");
  // }

  const validatedData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where: { userId: user.id },
    select: {
      id: true,
    },
  });

  if (!company?.id) {
    return redirect("/");
  }

  await prisma.jobPost.create({
    data: {
      jobDescription: validatedData.jobDescription,
      jobTitle: validatedData.jobTitle,
      employmentType: validatedData.employmentType,
      location: validatedData.location,
      salaryFrom: validatedData.salaryFrom,
      salaryTo: validatedData.salaryTo,
      listingDuration: validatedData.listingDuration,
      benefits: validatedData.benefits,
      companyId: company.id,
    },
  });

  return redirect("/");
};
