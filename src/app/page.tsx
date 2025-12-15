import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, ChefHat, Car, MapPin, Video, DollarSign, UtensilsCrossed, Coffee, Cake, Salad, Pizza, Dumbbell, Wine, Drumstick, PartyPopper, Calendar, Search, Star, Clock, LucideIcon } from 'lucide-react'
import PWAInstallPrompt from '@/components/shared/PWAInstallPrompt'
import DarkModeToggle from '@/components/shared/DarkModeToggle'

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
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg-elevated">
        {/* Decorative blob shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Centered Text Content */}
            <div className="text-center space-y-8 animate-fadeIn mb-12">
              {/* Logo/Brand */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-dark-text">
                Neighbor<span className="text-customer-500 dark:text-primary-dark">Eats</span>
              </h1>
              
              <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-dark-text font-semibold max-w-4xl mx-auto">
                Discover neighborhood chefs. Support local. Eat fresh.
              </p>

              <p className="text-lg md:text-xl text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto">
                A hyper-local marketplace connecting community chefs with customers and drivers.
                <br />
                <span className="font-bold text-emerald-600 dark:text-emerald-400">80-85% goes to chefs</span> · Fair economics · Fresh food
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center pt-4 max-w-4xl mx-auto">
                <Link
                  href="/auth/signup/customer"
                  className="px-8 py-4 bg-brand-teal dark:bg-primary-dark text-white font-bold rounded-xl hover:bg-brand-teal/90 dark:hover:bg-primary-dark/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2 text-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Join as Customer
                </Link>
                <Link
                  href="/apply/chef"
                  className="px-8 py-4 bg-brand-coral text-white font-bold rounded-xl hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2 text-lg"
                >
                  <ChefHat className="w-5 h-5" />
                  Become a Chef
                </Link>
                <Link
                  href="/apply/driver"
                  className="px-8 py-4 bg-driver-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2 text-lg"
                >
                  <Car className="w-5 h-5" />
                  Drive & Deliver
                </Link>
              </div>
            </div>

            {/* Hero Image - Below Content */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=800&fit=crop"
                  alt="Delicious food prepared by local chefs"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-md dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30 rounded-2xl flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-customer-500 dark:text-primary-dark" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-dark-text">Hyper-Local</h3>
            <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
              Find chefs within 0.5-15 miles. Support your actual neighbors.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-md dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-2xl flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-dark-text">LIVE Cooking</h3>
            <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
              Watch chefs cook in real-time. Build trust and authenticity.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-md dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl flex items-center justify-center mb-4">
              <DollarSign className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-dark-text">Fair Economics</h3>
            <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
              Chefs keep 80-85%. Drivers earn $4-5 per delivery. You save money.
            </p>
          </div>
        </div>
      </div>

      {/* Popular Dishes Showcase */}
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg-secondary dark:to-dark-bg py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-4">
              Popular Dishes from Local Chefs
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
              Discover what your neighbors are cooking today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Dish Card 1 - Gourmet Burger */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent dark:border-dark-border">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
                  alt="Gourmet burger with fresh ingredients"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">Signature Burger</h3>
                <p className="text-sm text-gray-500 dark:text-dark-text-muted mb-3">by Chef Maria's Kitchen</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold">4.9</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">25 min</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-dark-text ml-auto">$18</span>
                </div>
                <Link href="/explore" className="block w-full">
                  <button className="w-full bg-gray-900 dark:bg-primary-dark text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-primary-dark/90 transition active:scale-95">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Dish Card 2 - Fresh Salad */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent dark:border-dark-border">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
                  alt="Fresh healthy salad bowl"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">Buddha Bowl</h3>
                <p className="text-sm text-gray-500 dark:text-dark-text-muted mb-3">by Green Life Kitchen</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold dark:text-dark-text">4.8</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-dark-text-secondary">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">20 min</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-dark-text ml-auto">$16</span>
                </div>
                <Link href="/explore" className="block w-full">
                  <button className="w-full bg-gray-900 dark:bg-primary-dark text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-primary-dark/90 transition active:scale-95">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Dish Card 3 - Artisan Pizza */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent dark:border-dark-border">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
                  alt="Artisan wood-fired pizza"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">Margherita Pizza</h3>
                <p className="text-sm text-gray-500 dark:text-dark-text-muted mb-3">by Tony's Pizzeria</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold dark:text-dark-text">4.9</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-dark-text-secondary">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">30 min</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-dark-text ml-auto">$22</span>
                </div>
                <Link href="/explore" className="block w-full">
                  <button className="w-full bg-gray-900 dark:bg-primary-dark text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-primary-dark/90 transition active:scale-95">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Dish Card 4 - Dessert */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent dark:border-dark-border">
              <div className="relative h-56">
                <Image
                  src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop"
                  alt="Artisan chocolate cake"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">Chocolate Bliss</h3>
                <p className="text-sm text-gray-500 dark:text-dark-text-muted mb-3">by Sweet Dreams Bakery</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold dark:text-dark-text">5.0</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-dark-text-secondary">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">15 min</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-dark-text ml-auto">$12</span>
                </div>
                <Link href="/explore" className="block w-full">
                  <button className="w-full bg-gray-900 dark:bg-primary-dark text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-primary-dark/90 transition active:scale-95">
                    Order Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Community */}
      <div className="bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg-elevated py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-4">
              Meet Our Community
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
              Real people. Real food. Real connections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Chef Card */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent dark:border-dark-border">
              <div className="relative h-80">
                <Image
                  src="/chef-connie.png"
                  alt="Chef Connie Washington cooking in professional kitchen"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-4 right-4 bg-brand-burgundy text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Chef
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Connie Jones</h3>
                <p className="text-customer-500 dark:text-primary-dark font-semibold mb-3">Italian Cuisine Specialist</p>
                <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                  "I love sharing my grandmother's recipes with the neighborhood. NeighborEats lets me turn my passion into income."
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-muted">
                  <MapPin className="w-4 h-4" />
                  <span>Brooklyn, NY</span>
                </div>
              </div>
            </div>

            {/* Home Cook Card */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent dark:border-dark-border">
              <div className="relative h-80">
                <Image
                  src="/homecook-james.png"
                  alt="James Chen cooking healthy meal in home kitchen"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-4 right-4 bg-brand-coral text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Home Cook
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">James Chen</h3>
                <p className="text-amber-600 dark:text-amber-400 font-semibold mb-3">Healthy Meal Prep Expert</p>
                <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                  "As a fitness coach, I prep healthy meals for busy professionals in my area. It's rewarding work!"
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-muted">
                  <MapPin className="w-4 h-4" />
                  <span>Austin, TX</span>
                </div>
              </div>
            </div>

            {/* Driver Card */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-transparent dark:border-dark-border">
              <div className="relative h-80">
                <Image
                  src="/driver-sarah.png"
                  alt="Sarah Johnson delivering food with delivery bag"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-4 right-4 bg-driver-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Driver
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Sarah Johnson</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-3">Community Connector</p>
                <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                  "I deliver fresh food and meet amazing people every day. The flexible hours work perfectly for me."
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-text-muted">
                  <MapPin className="w-4 h-4" />
                  <span>Portland, OR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Join CTA */}
          <div className="text-center mt-16">
            <p className="text-xl text-gray-700 dark:text-dark-text-secondary mb-6">
              Ready to join our community?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth/signup/customer"
                className="px-8 py-4 bg-brand-teal dark:bg-primary-dark text-white font-semibold rounded-xl hover:bg-brand-teal/90 dark:hover:bg-primary-dark/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Join as Customer
              </Link>
              <Link
                href="/apply/chef"
                className="px-8 py-4 bg-brand-coral text-white font-semibold rounded-xl hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Cooking
              </Link>
              <Link
                href="/apply/driver"
                className="px-8 py-4 bg-driver-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start Driving
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Statistics */}
      <div className="bg-white dark:bg-dark-bg-elevated py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Stat 1 */}
            <div className="text-center animate-fadeIn">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30 rounded-full mb-4">
                <ChefHat className="w-10 h-10 text-customer-500 dark:text-primary-dark" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-2">500+</div>
              <div className="text-gray-600 dark:text-dark-text-secondary font-medium">Local Chefs</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-full mb-4">
                <UtensilsCrossed className="w-10 h-10 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-dark-text-secondary font-medium">Meals Delivered</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-full mb-4">
                <Star className="w-10 h-10 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-2">4.8</div>
              <div className="text-gray-600 dark:text-dark-text-secondary font-medium">Average Rating</div>
            </div>

            {/* Stat 4 */}
            <div className="text-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-100 to-amber-200 dark:from-rose-900/30 dark:to-amber-800/30 rounded-full mb-4">
                <DollarSign className="w-10 h-10 text-customer-500 dark:text-primary-dark" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-2">80-85%</div>
              <div className="text-gray-600 dark:text-dark-text-secondary font-medium">Goes to Chefs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gradient-to-br from-rose-50 to-emerald-50 dark:from-dark-bg dark:to-dark-bg-elevated py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-4">10 Categories Available</h2>
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary">Browse local chefs by food category</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {/* Category 1 - Meals */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop"
                  alt="Meals"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Meals
              </span>
            </div>

            {/* Category 2 - Juices & Smoothies */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=200&fit=crop"
                  alt="Juices & Smoothies"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Juices & Smoothies
              </span>
            </div>

            {/* Category 3 - Baked Goods */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop"
                  alt="Baked Goods"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Baked Goods
              </span>
            </div>

            {/* Category 4 - Specialty Diets */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop"
                  alt="Specialty Diets"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Specialty Diets
              </span>
            </div>

            {/* Category 5 - Ethnic Cuisines */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop"
                  alt="Ethnic Cuisines"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Ethnic Cuisines
              </span>
            </div>

            {/* Category 6 - Healthy/Wellness */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop"
                  alt="Healthy/Wellness"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Healthy/Wellness
              </span>
            </div>

            {/* Category 7 - Beverages */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=200&fit=crop"
                  alt="Beverages"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Beverages
              </span>
            </div>

            {/* Category 8 - Prepared Components */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop"
                  alt="Prepared Components"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Prepared Components
              </span>
            </div>

            {/* Category 9 - Catering */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?w=300&h=200&fit=crop"
                  alt="Catering"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Catering
              </span>
            </div>

            {/* Category 10 - Meal Plans */}
            <div className="flex flex-col items-center gap-3 bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-md dark:shadow-xl dark:shadow-black/20 hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer group overflow-hidden border border-transparent dark:border-dark-border">
              <div className="relative w-full h-32">
                <Image
                  src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop"
                  alt="Meal Plans"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-dark-text text-center pb-4 px-2">
                Meal Plans
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-dark-bg-elevated py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary">From browsing to delivery in four simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-rose-200 via-amber-200 to-emerald-200" style={{ top: '80px' }}></div>

            {/* Step 1 */}
            <div className="relative text-center animate-fadeIn">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30 rounded-full mb-6 relative z-10 hover:scale-110 transition-transform duration-300">
                <Search className="w-16 h-16 text-customer-500 dark:text-primary-dark" />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-customer-500 dark:bg-primary-dark text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-3">Browse</h3>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                Find local chefs nearby. Filter by cuisine, diet, or distance.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-full mb-6 relative z-10 hover:scale-110 transition-transform duration-300">
                <Video className="w-16 h-16 text-amber-600 dark:text-amber-400" />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-amber-600 dark:bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-3">Watch Live</h3>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                See chefs cook in real-time. Build trust and authenticity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-full mb-6 relative z-10 hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-16 h-16 text-emerald-600 dark:text-emerald-400" />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-600 dark:bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-3">Order</h3>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                Place your order. Pay securely. Support your community.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative text-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full mb-6 relative z-10 hover:scale-110 transition-transform duration-300">
                <Car className="w-16 h-16 text-blue-600 dark:text-blue-400" />
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-3">Delivered</h3>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                Fast local delivery. Fresh food from your neighbor's kitchen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-dark-bg-secondary dark:to-dark-bg py-16 border-t border-gray-200 dark:border-dark-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl text-gray-700 dark:text-dark-text-secondary">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-customer-500 dark:text-primary-dark font-bold hover:text-rose-700 dark:hover:text-primary-dark/80 hover:underline transition text-2xl">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      
      {/* Dark Mode Toggle */}
      <DarkModeToggle />
    </main>
  )
}

