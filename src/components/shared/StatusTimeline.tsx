interface StatusTimelineProps {
  currentStatus: string
  statuses: { key: string; label: string; timestamp?: Date }[]
}

export default function StatusTimeline({ currentStatus, statuses }: StatusTimelineProps) {
  const currentIndex = statuses.findIndex(s => s.key === currentStatus)

  return (
    <div className="space-y-4">
      {statuses.map((status, index) => {
        const isActive = index === currentIndex
        const isCompleted = index < currentIndex
        const isFuture = index > currentIndex

        return (
          <div key={status.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              {index < statuses.length - 1 && (
                <div
                  className={`w-0.5 h-12 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>

            <div className="flex-1 pb-8">
              <p
                className={`font-semibold ${
                  isActive ? 'text-teal-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {status.label}
              </p>
              {status.timestamp && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(status.timestamp).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

