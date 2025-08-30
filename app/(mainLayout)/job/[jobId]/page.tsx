import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { request } from "@arcjet/next";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonToHtml } from "@/components/general/json-to-html";
import { Button, buttonVariants } from "@/components/ui/button";
import { SavedJobButton } from "@/components/general/submit-buttons";

import { cn } from "@/lib/utils";
import { prisma } from "@/utils/db";
import { auth } from "@/auth";
import { getFlagIcon } from "@/utils/countries-list";
import { benefitList } from "@/utils/list-of-benefits";
import arcjet, { detectBot, tokenBucket } from "@/utils/arcjet";
import { saveJobPosts, unSaveJobPosts } from "@/actions/job.actions";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);

const getClient = (session: boolean) => {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE",
        capacity: 100,
        interval: 60,
        refillRate: 10,
      })
    );
  }
};

const getJob = async (jobId: string, userId?: string) => {
  const [jobData, savedJob] = await Promise.all([
    await prisma.jobPost.findUnique({
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
    }),
    userId
      ? prisma.savedJobPost.findUnique({
          where: { jobPostId_userId: { jobPostId: jobId, userId } },
          select: { id: true },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }

  return { jobData, savedJob };
};

type Params = Promise<{ jobId: string }>;

const JobDetailsPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;

  const session = await auth();

  const req = await request();

  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const { jobData: data, savedJob } = await getJob(jobId, session?.user?.id);

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
          {session?.user ? (
            <form
              action={
                savedJob
                  ? unSaveJobPosts.bind(null, savedJob.id)
                  : saveJobPosts.bind(null, jobId)
              }
            >
              <SavedJobButton savedJob={!!savedJob} />
            </form>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Heart className="size-4" />
              Save Job
            </Link>
          )}
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
