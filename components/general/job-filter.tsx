"use client";

import { XIcon } from "lucide-react";
import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { countryList } from "@/utils/countries-list";

const jobTypesList = [
  { name: "Full Time", value: "full-time" },
  { name: "Part Time", value: "part-time" },
  { name: "Contract", value: "contract" },
  { name: "Internship", value: "internship" },
  { name: "Freelance", value: "freelance" },
  { name: "Temporary", value: "temporary" },
];

export const JobFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(
    searchParams.get("jobTypes")?.split(",") || []
  );
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minSalary, setMinSalary] = useState(
    searchParams.get("minSalary") || ""
  );
  const [maxSalary, setMaxSalary] = useState(
    searchParams.get("maxSalary") || ""
  );

  const updateURL = useCallback(
    (types: string[], loc: string, min: string, max: string) => {
      const params = new URLSearchParams();
      if (types.length) params.set("jobTypes", types.join(","));
      if (loc) params.set("location", loc);
      if (min) params.set("minSalary", min);
      if (max) params.set("maxSalary", max);
      router.push(`?${params.toString()}`);
    },
    [router]
  );

  const debouncedUpdate = useRef(
    debounce((min: string, max: string, types: string[], loc: string) => {
      updateURL(types, loc, min, max);
    }, 500)
  ).current;

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

  useEffect(() => {
    setSelectedJobTypes(searchParams.get("jobTypes")?.split(",") || []);
    setLocation(searchParams.get("location") || "");
    setMinSalary(searchParams.get("minSalary") || "");
    setMaxSalary(searchParams.get("maxSalary") || "");
  }, [searchParams]);

  const handleJobTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...selectedJobTypes, type]
      : selectedJobTypes.filter((t) => t !== type);
    setSelectedJobTypes(newTypes);
    updateURL(newTypes, location, minSalary, maxSalary);
  };

  const handleLocationChange = (loc: string) => {
    setLocation(loc);
    updateURL(selectedJobTypes, loc, minSalary, maxSalary);
  };

  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinSalary(value);
    debouncedUpdate(value, maxSalary, selectedJobTypes, location);
  };

  const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxSalary(value);
    debouncedUpdate(minSalary, value, selectedJobTypes, location);
  };

  const clearFilters = () => {
    setSelectedJobTypes([]);
    setLocation("");
    setMinSalary("");
    setMaxSalary("");
    router.push("/");
  };

  return (
    <Card className="h-fit">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
        <Button
          size="sm"
          variant="destructive"
          onClick={clearFilters}
          className="h-8"
        >
          <XIcon size={16} />
          <span>Clear All</span>
        </Button>
      </CardHeader>

      <Separator className="mb-4" />

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Job Type</Label>
          <ul className="grid grid-cols-2 gap-4">
            {jobTypesList.map(({ name, value }) => (
              <li key={value} className="flex items-center space-x-2">
                <Checkbox
                  id={value}
                  checked={selectedJobTypes.includes(value)}
                  onCheckedChange={(checked) =>
                    handleJobTypeChange(value, checked as boolean)
                  }
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
          <Select value={location} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Worldwide</SelectLabel>
                <SelectItem value="worldwide">🌍 Worldwide / Remote</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                {countryList.map(({ name, code }) => (
                  <SelectItem key={code} value={name}>
                    <span className={`fi fi-${code.toLowerCase()}`} />
                    <span className="pl-2">{name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Salary Range</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minSalary" className="text-sm">
                Min Salary
              </Label>
              <Input
                id="minSalary"
                type="number"
                placeholder="0"
                value={minSalary}
                onChange={handleMinSalaryChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSalary" className="text-sm">
                Max Salary
              </Label>
              <Input
                id="maxSalary"
                type="number"
                placeholder="500,000"
                value={maxSalary}
                onChange={handleMaxSalaryChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
