export default function Map({ height = '400px' }: { height?: string }) {
  return (
    <div
      className="bg-gray-200 rounded-lg flex items-center justify-center"
      style={{ height }}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-gray-600 font-medium">Map View</p>
        <p className="text-sm text-gray-500">Interactive map coming soon</p>
      </div>
    </div>
  )
}

