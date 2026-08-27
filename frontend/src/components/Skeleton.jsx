const SkeletonLine = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`skeleton bg-base-content/10 ${className}`}
  />
);

const NoteSkeleton = () => (
  <article className="flex min-h-56 flex-col gap-4 rounded-box border border-base-content/10 bg-base-200 p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <SkeletonLine className="h-6 w-3/5 rounded-md" />
      <SkeletonLine className="size-8 shrink-0 rounded-full" />
    </div>

    <div className="space-y-2">
      <SkeletonLine className="h-4 w-full rounded-md" />
      <SkeletonLine className="h-4 w-11/12 rounded-md" />
      <SkeletonLine className="h-4 w-2/3 rounded-md" />
    </div>

    <div className="mt-auto flex items-center justify-between border-t border-base-content/10 pt-4">
      <SkeletonLine className="h-3 w-24 rounded-md" />
      <SkeletonLine className="h-3 w-16 rounded-md" />
    </div>
  </article>
);

const Skeleton = ({ count = 6, className = "" }) => (
  <section
    aria-busy="true"
    aria-label="Loading notes"
    className={`mx-auto max-w-6xl px-4 py-8 sm:px-6 ${className}`}
  >
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="space-y-3">
        <SkeletonLine className="h-8 w-44 rounded-md" />
        <SkeletonLine className="h-4 w-64 max-w-[60vw] rounded-md" />
      </div>
      <SkeletonLine className="hidden h-10 w-28 rounded-btn sm:block" />
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <NoteSkeleton key={index} />
      ))}
    </div>
  </section>
);

export default Skeleton;
