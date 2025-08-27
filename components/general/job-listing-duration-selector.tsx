import { ControllerRenderProps } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";
import { jobListingDurationPricing } from "@/app/utils/job-listing-duration-pricing";

interface IAppProps {
  field: ControllerRenderProps;
}

export const JobListingDurationSelector = ({ field }: IAppProps) => {
  return (
    <RadioGroup
      value={field.value?.toString()}
      onValueChange={(value) => field.onChange(parseInt(value))}
    >
      <ul className="flex flex-col gap-4">
        {jobListingDurationPricing.map(({ days, price, description }) => (
          <li key={days}>
            <RadioGroupItem
              value={days.toString()}
              id={days.toString()}
              className="sr-only"
            />
            <Label
              htmlFor={days.toString()}
              className="flex flex-col cursor-pointer"
            >
              <Card
                className={cn(
                  "w-full p-4 border-2 transition-all",
                  field.value === days
                    ? "border-primary bg-primary/10"
                    : "hover:bg-secondary/50"
                )}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-semibold">{days} Days</p>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${price}</p>
                    <p className="text-sm text-muted-foreground">
                      {(price / days).toFixed(2)}/days
                    </p>
                  </div>
                </div>
              </Card>
            </Label>
          </li>
        ))}
      </ul>
    </RadioGroup>
  );
};
