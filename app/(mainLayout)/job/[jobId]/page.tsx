import Image from "next/image";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonToHtml } from "@/components/general/json-to-html";

import { cn } from "@/lib/utils";
import { prisma } from "@/app/utils/db";
import { getFlagIcon } from "@/app/utils/countriesList";
import { benefitList } from "@/app/utils/list-of-benefits";

const getJob = async (jobId: string) => {
  const jobData = await prisma.jobPost.findUnique({
    where: { status: "ACTIVE", id: jobId },
    select: {
      jobTitle: true,
      jobDescription: true,
      location: true,
      employmentType: true,
      listingDuration: true,
      benefits: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          location: true,
          about: true,
          logo: true,
        },
      },
    },
  });

  if (!jobData) {
    return notFound();
  }

  return jobData;
};

type Params = Promise<{ jobId: string }>;

const JobDetailsPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;

  const data = await getJob(jobId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{data.jobTitle}</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="font-medium">{data.company.name}</p>
              <span className="hidden md:inline text-muted-foreground">*</span>
              <Badge className="rounded-full">{data.employmentType}</Badge>
              <span className="hidden md:inline text-muted-foreground">*</span>
              <Badge variant="secondary" className="rounded-full">
                {getFlagIcon(data.location)} {data.location}
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="lg">
            <Heart className="size-4" />
            Save Job
          </Button>
        </div>
        <section className="min-h-40">
          <JsonToHtml json={JSON.parse(data.jobDescription)} />
        </section>
        <section>
          <h3 className="mb-4 font-semibold">
            Benefits&nbsp;
            <span className="text-muted-foreground text-sm font-normal">
              (green ones are offered)
            </span>
          </h3>
          <ul className="flex flex-wrap items-center gap-3">
            {benefitList.map(({ id, label, icon: Icon }) => {
              const isOffered = data.benefits.includes(id);

              return (
                <li key={id}>
                  <Badge
                    variant={isOffered ? "default" : "outline"}
                    className={cn(
                      "px-4 py-1.5 text-sm rounded-full",
                      isOffered ? "" : "opacity-75 cursor-not-allowed"
                    )}
                  >
                    <Icon className="size-3" />
                    <span className="pl-2">{label}</span>
                  </Badge>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Apply Now</h3>
              <p className="mt-1 text-muted-foreground text-sm">
                Let {data.company.name} know you&apos;re interested in this job
                on Job Board. Your response helps us grow!
              </p>
            </div>
            <Button size="lg" className="w-full">
              Apply Now
            </Button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold">About the Job</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Apply before
              </span>
              <span className="text-sm">
                {new Date(
                  data.createdAt.getTime() +
                    data.listingDuration * 24 * 60 * 60 * 1000
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Posted on</span>
              <span className="text-sm">
                {data.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Employment type
              </span>
              <span className="text-sm">{data.employmentType}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="text-sm">
                {getFlagIcon(data.location)} {data.location}
              </span>
            </li>
          </ul>
        </Card>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={data.company.logo}
                alt={data.company.name}
                width={48}
                height={48}
                className="size-12 rounded-full"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold">{data.company.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {data.company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobDetailsPage;
