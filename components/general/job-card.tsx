import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";

import { formatCurrency } from "@/utils/format-currency";
import { formatRelativeTime } from "@/utils/format-relative-time";

interface IAppProps {
  job: {
    id: string;
    createdAt: Date;
    company: {
      about: string;
      name: string;
      location: string;
      logo: string;
    };
    location: string;
    jobTitle: string;
    employmentType: string;
    salaryFrom: number;
    salaryTo: number;
  };
}

export const JobCard = ({ job }: IAppProps) => {
  return (
    <Link href={`/job/${job.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
        <CardHeader className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={job.company.logo}
              alt={job.company.name}
              width={48}
              height={48}
              className="size-12 rounded-lg"
            />
            <div>
              <h2 className="text-xl md:text-2xl font-bold">{job.jobTitle}</h2>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {job.company.name}
                </p>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge variant="secondary" className="rounded-full">
                  {job.employmentType}
                </Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full">{job.location}</Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(job.salaryFrom, "USD")} -&nbsp;
                  {formatCurrency(job.salaryTo, "USD")}
                </p>
              </div>
            </div>
            <div className="md:ml-auto text-right">
              <div className="flex items-center justify-end gap-2">
                <MapPin className="size-4" />
                <h3>{job.location}</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-right">
                {formatRelativeTime(job.createdAt)}
              </p>
            </div>
          </div>
          <p className="text-base text-muted-foreground line-clamp-2s">
            {job.company.about}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
};
