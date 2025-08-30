import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CopyLink } from "@/components/general/copy-link";
import { EmptyState } from "@/components/general/empty-state";

import { prisma } from "@/utils/db";
import { requireUser } from "@/utils/require-user";

export const metadata: Metadata = {
  title: "Job Listings",
};

const getJobs = async (userId: string) => {
  const data = await prisma.jobPost.findMany({
    where: { company: { userId } },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      company: { select: { name: true, logo: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return data;
};

const MyJobsPage = async () => {
  const session = await requireUser();

  const data = await getJobs(session?.id as string);

  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No job posts found"
          description="You don't have any job posts yet."
          buttonText="Create a job post now!"
          href="/post-job"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>My Jobs</CardTitle>
            <CardDescription>
              Manage your job listings and applications here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map(({ id, jobTitle, status, createdAt, company }) => (
                  <TableRow key={id}>
                    <TableCell>
                      <Image
                        width={40}
                        height={40}
                        src={company.logo}
                        alt={company.name}
                        className="size-10 rounded-md"
                      />
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{jobTitle}</TableCell>
                    <TableCell>
                      {status.charAt(0).toUpperCase() +
                        status.slice(1).toLowerCase()}
                    </TableCell>
                    <TableCell>
                      {new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/my-jobs/${id}/edit`}>
                              <PenBoxIcon className="size-4" />
                              Edit Job
                            </Link>
                          </DropdownMenuItem>
                          <CopyLink
                            jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${id}`}
                          />
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/my-jobs/${id}/delete`}>
                              <XCircle className="size-4" />
                              Delete Job
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MyJobsPage;
