export default function NotificationSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />

      {/* Notification items */}
      {[1, 2, 3].map((item) => (
        <div key={item} className="border-b py-3">
          <div className="flex items-center gap-4">
            {/* Icon placeholder */}
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />

            <div className="space-y-1 max-w-md w-full">
              {/* Title placeholder */}
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          </div>

          {/* Timestamp placeholder */}
          <div className="flex justify-end mt-2">
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
