import { redirect } from "next/navigation";

import { auth } from "@/app/utils/auth";

export const requireUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  return session.user;
};
