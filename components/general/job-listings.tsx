import { JobPostStatus } from "@prisma/client";

import { JobCard } from "@/components/general/job-card";
import { EmptyState } from "@/components/general/empty-state";
import { PaginationComponent } from "@/components/general/pagination-component";

import { prisma } from "@/utils/db";

const getJobs = async (
  page: number = 1,
  pageSize: number = 10,
  jobTypes: string[] = [],
  location: string = "",
  minSalary?: string,
  maxSalary?: string
) => {
  const skip = (page - 1) * pageSize;

  const where = {
    status: JobPostStatus.ACTIVE,
    ...(jobTypes.length > 0 && { employmentType: { in: jobTypes } }),
    ...(location && location !== "worldwide" && { location: location }),
    ...(minSalary && { salaryTo: { gte: Number(minSalary) } }),
    ...(maxSalary && { salaryFrom: { lte: Number(maxSalary) } }),
  };

  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      skip,
      take: pageSize,
      where,
      select: {
        jobTitle: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.jobPost.count({ where }),
  ]);

  return {
    jobs: data,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
};

export const JobListings = async ({
  currentPage,
  jobTypes,
  location,
  minSalary,
  maxSalary,
}: {
  currentPage: number;
  jobTypes: string[];
  location: string;
  minSalary: string;
  maxSalary: string;
}) => {
  const {
    jobs,
    totalPages,
    currentPage: page,
  } = await getJobs(currentPage, 7, jobTypes, location, minSalary, maxSalary);

  return (
    <section>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found"
          description="Try searching for a different job title or location."
          buttonText="Clear all filters"
          href="/"
        />
      )}

      {jobs.length > 1 ? (
        <div className="flex justify-center mt-10">
          <PaginationComponent totalPages={totalPages} currentPage={page} />
        </div>
      ) : null}
    </section>
  );
};
