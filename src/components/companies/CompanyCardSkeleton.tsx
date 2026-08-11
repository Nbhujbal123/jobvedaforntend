export function CompanyCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-[16px] border border-secondary/10 bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-secondary/10" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-3/4 rounded bg-secondary/10" />
          <div className="h-3 w-1/2 rounded bg-secondary/10" />
        </div>
      </div>
      <div className="h-3 w-2/3 rounded bg-secondary/10" />
      <div className="h-3 w-full rounded bg-secondary/10" />
      <div className="h-3 w-4/5 rounded bg-secondary/10" />
      <div className="flex gap-2">
        <div className="h-9 flex-1 rounded-xl bg-secondary/10" />
        <div className="h-9 flex-1 rounded-xl bg-secondary/10" />
      </div>
    </div>
  );
}

export function CompanyCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <CompanyCardSkeleton key={index} />
      ))}
    </div>
  );
}
