export default function LiveBadge({ viewerCount }: { viewerCount?: number }) {
  return (
    <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full animate-pulse">
      <div className="w-2 h-2 bg-white rounded-full animate-ping" />
      <span className="font-bold text-sm">LIVE</span>
      {viewerCount !== undefined && (
        <span className="text-xs">👁 {viewerCount}</span>
      )}
    </div>
  )
}


