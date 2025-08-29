"use client";

import { useFormStatus } from "react-dom";
import { Heart, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

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

export const SavedJobButton = ({ savedJob }: { savedJob: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      size="lg"
      type="submit"
      className="min-w-35"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart
            className={cn(
              "size-4 transition-colors",
              savedJob ? "fill-current text-red-500" : ""
            )}
          />
          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
};
