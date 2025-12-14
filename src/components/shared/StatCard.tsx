interface StatCardProps {
  icon: string
  label: string
  value: string | number
  trend?: {
    value: number
    isPositive: boolean
  }
  onClick?: () => void
}

export default function StatCard({ icon, label, value, trend, onClick }: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}

