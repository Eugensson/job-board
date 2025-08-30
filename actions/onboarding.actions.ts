"use server";

import { z } from "zod";
import { request } from "@arcjet/next";
import { redirect } from "next/navigation";

import { prisma } from "@/utils/db";
import { requireUser } from "@/utils/require-user";
import { companySchema, jobSeekerSchema } from "@/schemas";
import arcjet, { detectBot, shield } from "@/utils/arcjet";

const aj = arcjet
  .withRule(shield({ mode: "LIVE" }))
  .withRule(detectBot({ mode: "LIVE", allow: [] }));

export const createCompany = async (data: z.infer<typeof companySchema>) => {
  const session = await requireUser();

  const req = await request();

  if (req.method !== "POST") {
    return redirect("/");
  }

  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

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
