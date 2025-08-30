import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonChips = ({ count }: { count: number }) => (
  <div className="flex gap-4 mt-4">
    {Array.from({ length: count }, (_, i) => (
      <Skeleton key={i} className="h-4 w-30" />
    ))}
  </div>
);

export const JobListingsLoading = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 3 }, (_, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="h-14 w-14 rounded" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-5 w-75" />
              <Skeleton className="h-4 w-50" />
              <SkeletonChips count={3} />
              <div className="flex justify-between items-center mt-4">
                <Skeleton className="h-4 w-37.5" />
                <Skeleton className="h-8 w-25" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
