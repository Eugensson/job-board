import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/logo.png";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/general/theme-toggle";
import { UserDropdown } from "@/components/general/user-dropdown";

import { auth } from "@/auth";

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

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link href="/post-job" className={buttonVariants({ size: "lg" })}>
          Post Job
        </Link>
        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            name={session.user.name as string}
            image={session.user.image as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
