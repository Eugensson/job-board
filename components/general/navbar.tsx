import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/logo.png";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/general/theme-toggle";

import { auth, signOut } from "@/app/utils/auth";

export const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="py-5 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo Job Board" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          Job<span className="text-primary">Board</span>
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session?.user ? (
          <form
            action={async () => {
              "use server";

              await signOut({ redirectTo: "/" });
            }}
          >
            <Button>Logout</Button>
          </form>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "default" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
