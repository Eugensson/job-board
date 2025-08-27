/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BenefitsSelector } from "@/components/general/benefits-selector";
import { UploadDropzone } from "@/components/general/uploadthing-reexported";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalaryRangeSelector } from "@/components/general/salary-range-selector";
import { JobDescriptionEditor } from "@/components/rich-text-editor/job-description-editor";
import { JobListingDurationSelector } from "@/components/general/job-listing-duration-selector";

import { createJob } from "@/app/actions";
import { jobSchema } from "@/app/utils/zodSchemas";
import { countryList } from "@/app/utils/countriesList";

interface IAppProps {
  companyName: string;
  companyLocation: string;
  companyAbout: string;
  companyLogo: string;
  companyWebsite: string;
  companyXAccount: string | null;
}

export const CreateJobForm = ({
  companyName,
  companyLocation,
  companyAbout,
  companyLogo,
  companyWebsite,
  companyXAccount,
}: IAppProps) => {
  const [pending, setPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      salaryTo: 0,
      benefits: [],
      jobTitle: "",
      location: "",
      salaryFrom: 0,
      employmentType: "",
      jobDescription: "",
      listingDuration: 30,
      companyName: companyName,
      companyLogo: companyLogo,
      companyAbout: companyAbout,
      companyWebsite: companyWebsite,
      companyLocation: companyLocation,
      companyXAccount: companyXAccount || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof jobSchema>) => {
    try {
      setPending(true);
      await createJob(values);
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        console.log("Something went wrong!");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="For example: Software Engineer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Employment Type</SelectLabel>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a job location" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Salary Range</FormLabel>
              <FormControl>
                <SalaryRangeSelector
                  control={form.control}
                  minSalary={10_000}
                  maxSalary={1_000_000}
                  step={2000}
                  currency="USD"
                />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <BenefitsSelector field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="For example: IT Consulting"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a company location" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="For example: itconsulting.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyXAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company X Account</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="For example: @itconsulting"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyAbout"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="For example: We are a company that..."
                      className="h-30 resize-none"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className="relative w-fit">
                          <Image
                            src={field.value}
                            alt="Company Logo"
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute -top-1 -right-1 z-10"
                            onClick={() => field.onChange("")}
                            title="Remove logo"
                          >
                            <XIcon className="size-4" />
                          </Button>
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].ufsUrl);
                          }}
                          onUploadError={() => {
                            console.log("Something went wrong!");
                          }}
                          className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Job Listing Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="listingDuration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <JobListingDurationSelector field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Submitting..." : "Create Job Post"}
        </Button>
      </form>
    </Form>
  );
};
