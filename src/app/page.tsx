import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <h1 className="text-6xl font-bold text-gray-900">
            🍽️ Neighbor<span className="text-teal-600">Eats</span>
          </h1>
          
          <p className="text-2xl text-gray-700 max-w-2xl mx-auto">
            Discover neighborhood chefs. Support local. Eat fresh.
          </p>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A hyper-local marketplace connecting community chefs with customers and drivers.
            <br />
            <span className="font-semibold text-teal-600">80-85% goes to chefs</span> · Fair economics · Fresh food
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/auth/signup/customer"
              className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              🛒 Find Local Chefs
            </Link>
            <Link
              href="/auth/signup/chef"
              className="px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition w-full sm:w-auto"
            >
              👨‍🍳 Become a Chef
            </Link>
            <Link
              href="/auth/signup/driver"
              className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition w-full sm:w-auto"
            >
              🚗 Drive & Deliver
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-4">🏘️</div>
              <h3 className="text-xl font-bold mb-2">Hyper-Local</h3>
              <p className="text-gray-600">
                Find chefs within 0.5-15 miles. Support your actual neighbors.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-xl font-bold mb-2">LIVE Cooking</h3>
              <p className="text-gray-600">
                Watch chefs cook in real-time. Build trust and authenticity.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Fair Economics</h3>
              <p className="text-gray-600">
                Chefs keep 80-85%. Drivers earn $4-5 per delivery. You save money.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="pt-16">
            <h2 className="text-3xl font-bold mb-8">10 Categories Available</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                '🍽️ Meals',
                '🥤 Juices & Smoothies',
                '🍪 Baked Goods',
                '🥗 Specialty Diets',
                '🍝 Ethnic Cuisines',
                '💪 Healthy/Wellness',
                '☕ Beverages',
                '🍗 Prepared Components',
                '🎉 Catering',
                '📅 Meal Plans'
              ].map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Login */}
          <div className="pt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-teal-600 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

