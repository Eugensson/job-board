"use client";

import { toast } from "sonner";
import { Link2 } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface CopyLinkProps {
  jobUrl: string;
}

export const CopyLink = ({ jobUrl }: CopyLinkProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success("URL copied to clipboard");
    } catch (err) {
      console.error("Could not copy text: ", err);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2 className="size-4" />
      <span>Copy Job URL</span>
    </DropdownMenuItem>
  );
};
