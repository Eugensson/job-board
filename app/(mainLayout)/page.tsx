import type { Metadata } from "next";

import { JobFilter } from "@/components/general/job-filter";
import { JobListings } from "@/components/general/job-listings";

export const metadata: Metadata = {
  title: "Home",
};

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
      <JobFilter />
      <JobListings />
    </div>
  );
};

export default Home;
