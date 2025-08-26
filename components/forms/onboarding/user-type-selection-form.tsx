"use client";

import { Building2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

import { UrerSelectionType } from "@/components/forms/onboarding/onboarding-form";

interface UserTypeSelectionFormProps {
  onSelect: (type: UrerSelectionType) => void;
}

export const UserTypeSelectionForm = ({
  onSelect,
}: UserTypeSelectionFormProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome! Let&apos;s get started</h2>
        <p className="text-muted-foreground">
          Choose how you would like to use our platform!
        </p>
      </div>
      <div className="grid gap-4">
        <Button
          onClick={() => onSelect("company")}
          variant="outline"
          size="lg"
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer"
        >
          <div className="size-12 flex items-center justify-center rounded-full bg-primary/10">
            <Building2 className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Company / Organization</h3>
            <p>Posts jobs and find exeptional talent</p>
          </div>
        </Button>

        <Button
          onClick={() => onSelect("jobSeeker")}
          variant="outline"
          size="lg"
          className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5 cursor-pointer"
        >
          <div className="size-12 flex items-center justify-center rounded-full bg-primary/10">
            <UserRound className="size-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold">Job Seeker</h3>
            <p>Find your dream job opportunity</p>
          </div>
        </Button>
      </div>
    </div>
  );
};
