import { Skeleton } from "./Skeleton";

export function SkeletonCard({ quantity = 1 }: { quantity?: number }) {
  const items = Array.from({ length: quantity });
  return (
    <>
      {items.map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[242px] rounded-xl bg-border w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[25%] bg-categoryColor" />
            <Skeleton className="h-4 w-[50%] bg-categoryColor" />
            <Skeleton className="h-4 w-[10%] bg-categoryColor" />
          </div>
        </div>
      ))}
    </>
  );
}
