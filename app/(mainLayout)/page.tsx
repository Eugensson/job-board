import { JobFilter } from "@/components/general/job-filter";
import { JobListings } from "@/components/general/job-listings";

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
      <JobFilter />
      <JobListings />
    </div>
  );
};

export default Home;
