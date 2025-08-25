"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

interface GeneralSubmitButtonProps {
  text: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className?: string;
  icon?: React.ReactNode;
  type?: "submit" | "button";
}

export const GeneralSubmitButton = ({
  text,
  variant,
  className,
  icon,
  type,
}: GeneralSubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={variant}
      className={className}
      type={type}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
};
