import Link from 'next/link'
import { ShoppingCart, ChefHat, Car, MapPin, Video, DollarSign, UtensilsCrossed, Coffee, Cake, Salad, Pizza, Dumbbell, Wine, Drumstick, PartyPopper, Calendar, LucideIcon } from 'lucide-react'

export default function Home() {
  const categories: { name: string; icon: LucideIcon }[] = [
    { name: 'Meals', icon: UtensilsCrossed },
    { name: 'Juices & Smoothies', icon: Wine },
    { name: 'Baked Goods', icon: Cake },
    { name: 'Specialty Diets', icon: Salad },
    { name: 'Ethnic Cuisines', icon: Pizza },
    { name: 'Healthy/Wellness', icon: Dumbbell },
    { name: 'Beverages', icon: Coffee },
    { name: 'Prepared Components', icon: Drumstick },
    { name: 'Catering', icon: PartyPopper },
    { name: 'Meal Plans', icon: Calendar }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <h1 className="text-6xl font-bold text-gray-900">
            Neighbor<span className="text-teal-600">Eats</span>
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
              className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow-md hover:shadow-lg w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Find Local Chefs
            </Link>
            <Link
              href="/auth/signup/chef"
              className="px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ChefHat className="w-5 h-5" />
              Become a Chef
            </Link>
            <Link
              href="/auth/signup/driver"
              className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Car className="w-5 h-5" />
              Drive & Deliver
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Hyper-Local</h3>
              <p className="text-gray-600">
                Find chefs within 0.5-15 miles. Support your actual neighbors.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">LIVE Cooking</h3>
              <p className="text-gray-600">
                Watch chefs cook in real-time. Build trust and authenticity.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Fair Economics</h3>
              <p className="text-gray-600">
                Chefs keep 80-85%. Drivers earn $4-5 per delivery. You save money.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="pt-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">10 Categories Available</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {categories.map(({ name, icon: Icon }) => (
                <span
                  key={name}
                  className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:border-teal-600 hover:text-teal-600 transition flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {name}
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

