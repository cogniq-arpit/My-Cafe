/** SkeletonLoader.jsx — Reusable skeleton loading placeholder */
export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-[var(--bg-secondary)] shadow-warm-sm animate-pulse">
      <div className="h-48 shimmer-bg" />
      <div className="p-4 space-y-3">
        <div className="h-4 shimmer-bg rounded-full w-3/4" />
        <div className="h-3 shimmer-bg rounded-full w-full" />
        <div className="h-3 shimmer-bg rounded-full w-2/3" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-5 shimmer-bg rounded-full w-16" />
          <div className="h-8 shimmer-bg rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-3 shimmer-bg rounded-full ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}
