"use client";

import Image from "next/image";
import { useState } from "react";

import Logo from "@/public/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import { CompanyForm } from "@/components/forms/onboarding/company-form";
import { UserTypeSelectionForm } from "@/components/forms/onboarding/user-type-selection-form";

export type StepType = 1 | 2;
export type UrerSelectionType = "company" | "jobSeeker" | null;

export const OnboardingForm = () => {
  const [step, setStep] = useState<StepType>(1);
  const [userType, setUserType] = useState<UrerSelectionType>(null);

  const handleUrerTypeSelection = (type: UrerSelectionType) => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelectionForm onSelect={handleUrerTypeSelection} />;
      case 2:
        return userType === "company" ? (
          <CompanyForm />
        ) : (
          <p>User is a job seeker</p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-10 flex items-center gap-4">
        <Image src={Logo} alt="Logo Job Board" width={50} height={50} />
        <h1 className="text-4xl font-bold">
          Job<span className="text-primary">Board</span>
        </h1>
      </div>
      <Card className="max-w-lg w-full">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
};
