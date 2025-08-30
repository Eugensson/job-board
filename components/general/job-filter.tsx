import { XIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { countryList } from "@/utils/countries-list";

const jobTypes = [
  { name: "Full Time", value: "full-time" },
  { name: "Part Time", value: "part-time" },
  { name: "Contract", value: "contract" },
  { name: "Internship", value: "internship" },
  { name: "Freelance", value: "freelance" },
  { name: "Temporary", value: "temporary" },
];

export const JobFilter = () => {
  return (
    <Card className="h-fit">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
        <Button size="sm" variant="destructive">
          <XIcon size={16} />
          <span>Clear All</span>
        </Button>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Job Type</Label>
          <ul className="grid grid-cols-2 gap-4">
            {jobTypes.map(({ name, value }) => (
              <li key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={value}
                  name="jobType"
                  value={value}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={value}
                  className="text-sm font-medium cursor-pointer"
                >
                  {name}
                </Label>
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Location</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Worldwide</SelectLabel>
                <SelectItem value="worldwide">
                  <span>🌍</span>
                  <span className="pl-1">Worldwide / Remote</span>
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map(({ name, code }) => (
                  <SelectItem
                    key={code}
                    value={name}
                    className="flex items-center"
                  >
                    <span className={`fi fi-${code.toLowerCase()}`} />
                    <span className="pl-2">{name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Separator />
      </CardContent>
    </Card>
  );
};
