import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, ChefHat, Car, MapPin, Video, DollarSign, UtensilsCrossed, Coffee, Cake, Salad, Pizza, Dumbbell, Wine, Drumstick, PartyPopper, Calendar, Search, Star, Clock, LucideIcon } from 'lucide-react'
import PWAInstallPrompt from '@/components/shared/PWAInstallPrompt'

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
      {/* Hero Section - Vertical Layout */}
      <div className="relative overflow-hidden bg-gradient-to-b from-brand-light via-orange-50 to-white">
        {/* Decorative blob shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-burgundy/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-coral/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-3xl mx-auto px-4 py-16 relative z-10">
          {/* Vertical Content Stack */}
          <div className="flex flex-col items-center text-center space-y-8 animate-fadeIn">
            {/* Logo */}
            <div>
              <Image
                src="/logo.png"
                alt="NeighborEats Logo"
                width={400}
                height={120}
                priority
                className="w-auto h-20 md:h-28"
              />
            </div>
            
            <h1 className="text-3xl md:text-5xl text-gray-800 font-bold max-w-2xl">
              Discover neighborhood chefs. Support local. Eat fresh.
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              A hyper-local marketplace connecting community chefs with customers and drivers.
            </p>

            {/* Hero Image - Full Width */}
            <div className="relative w-full h-[300px] md:h-[400px] animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop"
                  alt="Delicious food prepared by local chefs"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 w-full max-w-md">
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-brand-teal text-2xl font-bold">80-85%</span> goes to chefs
              </p>
              <p className="text-gray-600 mt-2">Fair economics · Fresh food · Local support</p>
            </div>

            {/* CTA Buttons - Vertical Stack */}
            <div className="flex flex-col gap-4 w-full max-w-md pt-4">
              <Link
                href="/explore"
                className="px-8 py-5 bg-brand-burgundy text-white font-semibold text-lg rounded-2xl hover:bg-customer-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                Find Local Chefs
              </Link>
              <Link
                href="/apply/chef"
                className="px-8 py-4 bg-brand-coral text-white font-semibold rounded-2xl hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
              >
                <ChefHat className="w-5 h-5" />
                Become a Chef
              </Link>
              <Link
                href="/apply/driver"
                className="px-8 py-4 bg-driver-500 text-white font-semibold rounded-2xl hover:bg-brand-teal transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
              >
                <Car className="w-5 h-5" />
                Drive & Deliver
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Vertical Cards */}
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-10 h-10 text-customer-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Hyper-Local</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Find chefs within 0.5-15 miles. Support your actual neighbors and get the freshest meals delivered quickly.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Video className="w-10 h-10 text-brand-coral" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">LIVE Cooking</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Watch chefs cook in real-time. Build trust and authenticity by seeing your food being prepared live.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-10 h-10 text-brand-teal" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Fair Economics</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Chefs keep 80-85%. Drivers earn $4-5 per delivery. You save money. Everyone wins with fair pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Dishes Showcase - Vertical Layout */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Dishes from Local Chefs
            </h2>
            <p className="text-xl text-gray-600">
              Discover what your neighbors are cooking today
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Dish Card 1 - Gourmet Burger */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
                  alt="Gourmet burger with fresh ingredients"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Signature Burger</h3>
                <p className="text-gray-500 mb-4">by Chef Maria's Kitchen</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-semibold">4.9</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>25 min</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">$18</span>
                </div>
                <Link href="/explore" className="block">
                  <button className="w-full bg-brand-burgundy text-white py-4 rounded-2xl font-semibold hover:bg-customer-500 transition">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Dish Card 2 - Fresh Salad */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop"
                  alt="Fresh healthy salad bowl"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Buddha Bowl</h3>
                <p className="text-gray-500 mb-4">by Green Life Kitchen</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-semibold">4.8</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>20 min</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">$16</span>
                </div>
                <Link href="/explore" className="block">
                  <button className="w-full bg-brand-burgundy text-white py-4 rounded-2xl font-semibold hover:bg-customer-500 transition">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Dish Card 3 - Artisan Pizza */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop"
                  alt="Artisan wood-fired pizza"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Margherita Pizza</h3>
                <p className="text-gray-500 mb-4">by Tony's Pizzeria</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="text-lg font-semibold">4.9</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>30 min</span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">$22</span>
                </div>
                <Link href="/explore" className="block">
                  <button className="w-full bg-brand-burgundy text-white py-4 rounded-2xl font-semibold hover:bg-customer-500 transition">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Community - Vertical Layout */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Community
            </h2>
            <p className="text-xl text-gray-600">
              Real people. Real food. Real connections.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Chef Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/chef-connie.png"
                  alt="Chef Connie Washington cooking in professional kitchen"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-6 right-6 bg-brand-burgundy text-white px-5 py-2.5 rounded-full font-bold shadow-lg">
                  Chef
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Connie Jones</h3>
                <p className="text-customer-500 font-bold text-lg mb-4">Italian Cuisine Specialist</p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  "I love sharing my grandmother's recipes with the neighborhood. NeighborEats lets me turn my passion into income."
                </p>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">Brooklyn, NY</span>
                </div>
              </div>
            </div>

            {/* Home Cook Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/homecook-james.png"
                  alt="James Chen cooking healthy meal in home kitchen"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-6 right-6 bg-brand-coral text-white px-5 py-2.5 rounded-full font-bold shadow-lg">
                  Home Cook
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">James Chen</h3>
                <p className="text-brand-coral font-bold text-lg mb-4">Healthy Meal Prep Expert</p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  "As a fitness coach, I prep healthy meals for busy professionals in my area. It's rewarding work!"
                </p>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">Austin, TX</span>
                </div>
              </div>
            </div>

            {/* Driver Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/driver-sarah.png"
                  alt="Sarah Johnson delivering food with delivery bag"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-6 right-6 bg-driver-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg">
                  Driver
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Sarah Johnson</h3>
                <p className="text-brand-teal font-bold text-lg mb-4">Community Connector</p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  "I deliver fresh food and meet amazing people every day. The flexible hours work perfectly for me."
                </p>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">Portland, OR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Join CTA */}
          <div className="text-center mt-16">
            <p className="text-2xl text-gray-800 font-semibold mb-8">
              Ready to join our community?
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href="/apply/chef"
                className="px-10 py-5 bg-brand-coral text-white font-bold text-lg rounded-2xl hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                Start Cooking
              </Link>
              <Link
                href="/apply/driver"
                className="px-10 py-5 bg-driver-500 text-white font-bold text-lg rounded-2xl hover:bg-brand-teal transition-all shadow-lg hover:shadow-xl"
              >
                Start Driving
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Statistics - Vertical List */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-xl mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Stat 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg flex items-center gap-6 animate-fadeIn">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center flex-shrink-0">
                <ChefHat className="w-12 h-12 text-customer-500" />
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900">500+</div>
                <div className="text-gray-600 font-semibold text-lg mt-1">Local Chefs</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg flex items-center gap-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center flex-shrink-0">
                <UtensilsCrossed className="w-12 h-12 text-brand-coral" />
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900">10,000+</div>
                <div className="text-gray-600 font-semibold text-lg mt-1">Meals Delivered</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg flex items-center gap-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-3xl flex items-center justify-center flex-shrink-0">
                <Star className="w-12 h-12 text-brand-teal fill-brand-teal" />
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900">4.8</div>
                <div className="text-gray-600 font-semibold text-lg mt-1">Average Rating</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg flex items-center gap-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-200 rounded-3xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-12 h-12 text-customer-500" />
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900">80-85%</div>
                <div className="text-gray-600 font-semibold text-lg mt-1">Goes to Chefs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Vertical Timeline */}
      <div className="bg-white py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">From browsing to delivery in four simple steps</p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-16 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-burgundy via-brand-coral to-brand-teal"></div>

            <div className="flex flex-col gap-12">
              {/* Step 1 */}
              <div className="relative flex items-start gap-6 animate-fadeIn">
                <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg">
                  <Search className="w-16 h-16 text-customer-500" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-customer-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    1
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Browse</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Find local chefs nearby. Filter by cuisine, diet, or distance to discover the perfect meal.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg">
                  <Video className="w-16 h-16 text-brand-coral" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-brand-coral text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    2
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Watch Live</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    See chefs cook in real-time. Build trust and authenticity by watching your food being prepared.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg">
                  <ShoppingCart className="w-16 h-16 text-brand-teal" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    3
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Order</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Place your order securely. Pay safely and support your local community with every purchase.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-start gap-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg">
                  <Car className="w-16 h-16 text-brand-teal" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-brand-teal text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    4
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Delivered</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Fast local delivery. Get fresh food from your neighbor's kitchen delivered right to your door.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 py-16 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl text-gray-700">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-customer-500 font-bold hover:text-brand-burgundy hover:underline transition text-2xl">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </main>
  )
}


