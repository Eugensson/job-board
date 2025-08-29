import { JobCard } from "@/components/general/job-card";
import { EmptyState } from "@/components/general/empty-state";

import { prisma } from "@/app/utils/db";

async function getData() {
  const data = await prisma.jobPost.findMany({
    where: { status: "ACTIVE" },
    select: {
      id: true,
      jobTitle: true,
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
  });

  return data;
}

export const JobListings = async () => {
  const data = await getData();

  return (
    <>
      {data.length > 0 ? (
        <ul className="flex flex-col gap-6">
          {data.map((job) => (
            <li key={job.id}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No job posts"
          description="We couldn’t find any job posts matching your search. Try adjusting your
        filters or check back later."
          buttonText="Clear all filters"
          href="/"
        />
      )}
    </>
  );
};
