import Link from "next/link";
import { CircleX, SearchX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface IAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const EmptyState = ({
  title,
  description,
  buttonText,
  href,
}: IAppProps) => {
  return (
    <div className="h-full flex flex-1 flex-col items-center justify-center gap-5 border border-primary/50 border-dashed rounded-md p-10">
      <div className="size-20 flex items-center justify-center rounded-full bg-primary/10">
        <SearchX className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 max-w-sm text-sm leading-tight text-muted-foreground text-center text-balance">
        {description}
      </p>
      <Link
        href={href}
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        <CircleX />
        {buttonText}
      </Link>
    </div>
  );
};
