import "server-only";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/utils/db";

export const requireUser = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session.user;
};

export const requireCompany = async () => {
  const session = await requireUser();

  const company = await prisma.company.findUnique({
    where: { userId: session?.id as string },
    select: { id: true },
  });

  if (!company) {
    redirect("/");
  }

  return company;
};
