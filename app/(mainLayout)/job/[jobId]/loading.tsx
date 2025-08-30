import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLines = ({ count }: { count: number }) => (
  <div className="space-y-2">
    {Array.from({ length: count }, (_, i) => (
      <Skeleton key={i} className="h-4 w-full" />
    ))}
  </div>
);

const SkeletonChips = ({ count }: { count: number }) => (
  <div className="flex flex-wrap gap-3">
    {Array.from({ length: count }, (_, i) => (
      <Skeleton key={i} className="h-8 w-35 rounded-full" />
    ))}
  </div>
);

const SkeletonList = ({ count }: { count: number }) => (
  <ul className="space-y-2">
    {Array.from({ length: count }, (_, i) => (
      <li key={i} className="flex justify-between">
        <Skeleton className="h-4 w-25" />
        <Skeleton className="h-4 w-30" />
      </li>
    ))}
  </ul>
);

const LoadingJobPage = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        <div className="space-y-8">
          <div className="flex items-start justify-between">
            <div>
              <Skeleton className="h-9 w-75 mb-2" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-37.5" />
                <Skeleton className="h-5 w-30" />
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <SkeletonLines count={20} />
          </section>

          <section>
            <Skeleton className="h-6 w-50 mb-4" />
            <SkeletonChips count={15} />
          </section>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-6 w-25 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-[150px]" />
              <SkeletonList count={4} />
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <SkeletonChips count={5} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="rounded-full size-12" />
                <div>
                  <Skeleton className="h-5 w-37.5 mb-2" />
                  <Skeleton className="h-4 w-50" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoadingJobPage;
