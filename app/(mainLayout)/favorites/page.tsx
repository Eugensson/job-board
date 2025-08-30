import type { Metadata } from "next";

import { JobCard } from "@/components/general/job-card";
import { EmptyState } from "@/components/general/empty-state";

import { prisma } from "@/utils/db";
import { requireUser } from "@/utils/require-user";

export const metadata: Metadata = {
  title: "Favorite Jobs",
};

const getFavorites = async (userId: string) => {
  const data = await prisma.savedJobPost.findMany({
    where: { userId },
    select: {
      jobPost: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          location: true,
          employmentType: true,
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
      },
    },
  });

  return data;
};

const FavoritesPage = async () => {
  const session = await requireUser();

  const data = await getFavorites(session?.id as string);

  if (data.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        description="You don't have any favorites yet."
        buttonText="Find a job"
        href="/"
      />
    );
  }

  return (
    <ul className="mt-5 grid grid-cols-1 gap-4">
      {data.map(({ jobPost }) => (
        <li key={jobPost.id}>
          <JobCard job={jobPost} />
        </li>
      ))}
    </ul>
  );
};

export default FavoritesPage;
