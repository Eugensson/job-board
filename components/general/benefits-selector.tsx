"use client";

import { ControllerRenderProps } from "react-hook-form";

import { Badge } from "@/components/ui/badge";

import { benefitList } from "@/app/utils/list-of-benefits";

interface IAppProps {
  field: ControllerRenderProps;
}

export const BenefitsSelector = ({ field }: IAppProps) => {
  const toggleBenefit = (benefitId: string) => {
    const currentBenefits = field.value || [];

    const newBenefits = currentBenefits.includes(benefitId)
      ? currentBenefits.filter((id: string) => benefitId !== id)
      : [...currentBenefits, benefitId];

    field.onChange(newBenefits);
  };

  return (
    <div>
      <ul className="flex flex-wrap gap-3">
        {benefitList.map(({ id, label, icon: Icon }) => {
          const isSelected = (field.value || []).includes(id);

          return (
            <li key={id}>
              <Badge
                variant={isSelected ? "default" : "outline"}
                className="px-4 py-1.5 text-sm cursor-pointer transition-all hover:scale-105 active:scale-95 rounded-full"
                onClick={() => toggleBenefit(id)}
              >
                <Icon className="size-3" />
                <span className="pl-2">{label}</span>
              </Badge>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 text-sm text-muted-foreground">
        Selected benefits:&nbsp;
        <span className="text-primary">{field.value?.length || 0}</span>
      </div>
    </div>
  );
};
