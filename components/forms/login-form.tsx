import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GeneralSubmitButton } from "@/components/general/submit-buttons";

import { auth, signIn } from "@/app/utils/auth";

export const LoginForm = async () => {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <form
              action={async () => {
                "use server";

                await signIn("github", { redirectTo: "/onboarding" });
              }}
            >
              <GeneralSubmitButton
                type="submit"
                text="Login with Github"
                variant="outline"
                className="w-full cursor-pointer"
                icon={<FaGithub className="size-4 dark:text-white" />}
              />
            </form>
            <form
              action={async () => {
                "use server";

                await signIn("google", { redirectTo: "/onboarding" });
              }}
            >
              <GeneralSubmitButton
                type="submit"
                text="Login with Google"
                variant="outline"
                className="w-full cursor-pointer"
                icon={<FcGoogle className="size-4" />}
              />
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground text-balance">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
};
