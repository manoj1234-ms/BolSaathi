const LoadingSkeleton = ({ type = "card", count = 1 }) => {
  const SkeletonCard = () => (
    <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-white/10 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-white/10 rounded"></div>
        <div className="h-3 bg-gray-300 dark:bg-white/10 rounded w-5/6"></div>
      </div>
    </div>
  );

  const SkeletonStats = () => (
    <div className="bg-white/90 dark:bg-[#0C0F1D]/90 backdrop-blur-xl border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-lg animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="w-12 h-12 bg-gray-300 dark:bg-white/10 rounded-lg"></div>
        <div className="h-8 bg-gray-300 dark:bg-white/10 rounded w-16"></div>
      </div>
      <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-20"></div>
    </div>
  );

  const SkeletonText = () => (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 dark:bg-white/10 rounded w-4/6"></div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return <SkeletonCard />;
      case "stats":
        return <SkeletonStats />;
      case "text":
        return <SkeletonText />;
      default:
        return <SkeletonCard />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
};

export default LoadingSkeleton;

