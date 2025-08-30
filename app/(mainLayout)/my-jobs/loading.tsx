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
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTableRow = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="size-10 rounded-lg" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-35" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-45" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-25" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-30" />
    </TableCell>
    <TableCell className="text-right">
      <Skeleton className="size-8 rounded-md ml-auto" />
    </TableCell>
  </TableRow>
);

const LoadingMyJobs = () => {
  return (
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
              <TableHead>Created On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 6 }, (_, index) => (
              <SkeletonTableRow key={index} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LoadingMyJobs;
