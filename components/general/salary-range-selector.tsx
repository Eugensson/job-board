/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Control, useController } from "react-hook-form";

import { Slider } from "@/components/ui/slider";

import { formatCurrency } from "@/app/utils/format-currency";

interface IAappProps {
  control: Control<any>;
  minSalary: number;
  maxSalary: number;
  step: number;
  currency: string;
}

export const SalaryRangeSelector = ({
  control,
  minSalary,
  maxSalary,
  step,
  currency,
}: IAappProps) => {
  const { field: salaryFromField } = useController({
    name: "salaryFrom",
    control,
  });

  const { field: salaryToField } = useController({
    name: "salaryTo",
    control,
  });

  const [range, setRange] = useState<[number, number]>([
    salaryFromField.value || minSalary,
    salaryToField.value || maxSalary / 2,
  ]);

  const handleChangeRange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setRange(newRange);
    salaryFromField.onChange(newRange[0]);
    salaryToField.onChange(newRange[1]);
  };

  return (
    <div className="w-full space-y-2">
      <Slider
        onValueChange={handleChangeRange}
        min={minSalary}
        max={maxSalary}
        step={step}
        value={range}
      />
      <div className="flex items-center justify-between text-sm">
        <span>{formatCurrency(range[0], currency)}</span>
        <span>{formatCurrency(range[1], currency)}</span>
      </div>
    </div>
  );
};
