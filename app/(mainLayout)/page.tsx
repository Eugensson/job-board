import { Suspense } from "react";
import type { Metadata } from "next";

import { JobFilter } from "@/components/general/job-filter";
import { JobListings } from "@/components/general/job-listings";
import { JobListingsLoading } from "@/components/general/job-listings-loading";

export const metadata: Metadata = {
  title: "Home",
};

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
    minSalary?: string;
    maxSalary?: string;
  }>;
};

const Home = async ({ searchParams }: SearchParamsProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const jobTypes = params.jobTypes?.split(",") || [];
  const location = params.location || "";
  const minSalary = params.minSalary || "";
  const maxSalary = params.maxSalary || "";

  const filterKey = `page=${currentPage};types=${jobTypes.join(
    ","
  )};location=${location};min=${minSalary};max=${maxSalary}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
      <JobFilter />
      <Suspense key={filterKey} fallback={<JobListingsLoading />}>
        <JobListings
          currentPage={currentPage}
          jobTypes={jobTypes}
          location={location}
          minSalary={minSalary}
          maxSalary={maxSalary}
        />
      </Suspense>
    </div>
  );
};

export default Home;
