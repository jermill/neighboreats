'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Button from '@/components/shared/Button'
import LiveBadge from '@/components/shared/LiveBadge'

export default function LiveStreamingPage() {
  const chefName = "Maria Rodriguez"
  const [isLive, setIsLive] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const [streamDuration, setStreamDuration] = useState(0)

  const handleGoLive = () => {
    setIsLive(true)
    setViewerCount(3)
    // In real app, initialize Agora stream
  }

  const handleEndStream = () => {
    if (confirm('Are you sure you want to end the stream?')) {
      setIsLive(false)
      setViewerCount(0)
      setStreamDuration(0)
    }
  }

  const mockComments = [
    { id: 1, user: 'Sarah M.', message: 'Looks delicious! 😋', time: '2 min ago' },
    { id: 2, user: 'Mike R.', message: 'Can you share the recipe?', time: '5 min ago' },
    { id: 3, user: 'Emma W.', message: 'Adding to my cart now!', time: '7 min ago' },
  ]

  return (
    <DashboardLayout userRole="chef" userName={chefName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Live Streaming</h1>
          {isLive && <LiveBadge viewerCount={viewerCount} />}
        </div>

        {!isLive ? (
          /* Not Live - Setup Screen */
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-12 text-white text-center">
              <div className="text-6xl mb-4">📹</div>
              <h2 className="text-3xl font-bold mb-4">Go LIVE and Connect with Customers</h2>
              <p className="text-xl mb-8 opacity-90">
                Stream your cooking process to build trust and authenticity
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={handleGoLive}
                className="bg-white text-teal-600 hover:bg-gray-100"
              >
                🔴 Start Live Stream
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-3">👀</div>
                <h3 className="text-lg font-bold mb-2">Build Trust</h3>
                <p className="text-gray-600">
                  Let customers see your real kitchen and cooking process
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-3">🛒</div>
                <h3 className="text-lg font-bold mb-2">Boost Sales</h3>
                <p className="text-gray-600">
                  Customers can order directly while watching you cook
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-lg font-bold mb-2">Engage</h3>
                <p className="text-gray-600">
                  Chat with viewers and answer questions in real-time
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Tips for a Great Stream</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Ensure good lighting in your kitchen</li>
                <li>✓ Position camera to show your cooking area</li>
                <li>✓ Describe what you're making and the process</li>
                <li>✓ Engage with viewer comments and questions</li>
                <li>✓ Mention your menu items and subscriptions</li>
                <li>✓ Keep streams between 30-60 minutes for best engagement</li>
              </ul>
            </div>
          </div>
        ) : (
          /* Live - Streaming Screen */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Preview */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                <div className="relative text-center text-white z-10">
                  <div className="text-6xl mb-4">📹</div>
                  <p className="text-xl font-bold">Camera Feed</p>
                  <p className="text-sm opacity-75">Your live stream preview</p>
                </div>
                <div className="absolute top-4 left-4 z-20">
                  <LiveBadge viewerCount={viewerCount} />
                </div>
              </div>

              {/* Stream Controls */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="text-xl font-bold">12:34</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Peak Viewers</p>
                      <p className="text-xl font-bold text-teal-600">15</p>
                    </div>
                  </div>
                  <Button variant="danger" onClick={handleEndStream}>
                    End Stream
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat */}
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-[600px]">
              <h3 className="text-lg font-bold mb-4">Live Chat</h3>
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {mockComments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.message}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Button size="sm">Send</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}


