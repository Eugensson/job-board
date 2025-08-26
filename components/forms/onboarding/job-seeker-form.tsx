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
import PdfImage from "@/public/pdf.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/general/uploadthing-reexported";

import { createJobSeeker } from "@/app/actions";
import { jobSeekerSchema } from "@/app/utils/zodSchemas";

export const JobSeekerForm = () => {
  const [pending, setPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      name: "",
      about: "",
      resume: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof jobSeekerSchema>) => {
    try {
      setPending(true);
      await createJobSeeker(data);
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
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your full name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Bio</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Tell us about yourself..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume (PDF)</FormLabel>
              <FormControl>
                <div>
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src={PdfImage}
                        alt="pdf resume image"
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
                      endpoint="resumeUploader"
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
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </Form>
  );
};
