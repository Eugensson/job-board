import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/logo.png";
import { LoginForm } from "@/components/forms/login-form";

const Login = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center">
          <Image src={Logo} alt="Logo Job Board" className="size-10" />
          <h1 className="text-2xl font-bold">
            Job<span className="text-primary">Board</span>
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
