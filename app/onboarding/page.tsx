import { OnboardingForm } from "@/components/forms/onboarding/onboarding-form";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "../utils/require-user";

const checkIfUserFinishedOnboarding = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { onboardingCompleted: true },
  });

  if (user?.onboardingCompleted === true) {
    return redirect("/");
  }

  return user;
};

const OnboardingPage = async () => {
  const session = await requireUser();

  await checkIfUserFinishedOnboarding(session.id as string);

  return (
    <div className="min-h-screen w-screen py-10 flex flex-col items-center justify-center">
      <OnboardingForm />
    </div>
  );
};

export default OnboardingPage;
