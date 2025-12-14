import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, ChefHat, Car, MapPin, Video, DollarSign, UtensilsCrossed, Coffee, Cake, Salad, Pizza, Dumbbell, Wine, Drumstick, PartyPopper, Calendar, Search, Star, Clock, LucideIcon, CheckCircle, X } from 'lucide-react'
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
    <main className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero Section - Mobile/Tablet Optimized */}
      <div className="relative overflow-hidden bg-gradient-to-b from-brand-light via-orange-50 to-white dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg-elevated">
        {/* Decorative blob shapes - Smaller on mobile */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-brand-burgundy/20 dark:bg-brand-burgundy/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 left-0 w-64 h-64 md:w-96 md:h-96 bg-brand-coral/20 dark:bg-brand-coral/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
          {/* Vertical Content Stack */}
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Logo - Responsive sizing */}
            <div>
              <Image
                src="/logo.png"
                alt="NeighborEats Logo"
                width={400}
                height={120}
                priority
                className="w-auto h-16 sm:h-20 md:h-24 lg:h-28"
              />
            </div>
            
            {/* Headline - Responsive text */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 dark:text-dark-text font-bold max-w-2xl px-2">
              Discover neighborhood chefs. Support local. Eat fresh.
            </h1>

            {/* Subheadline - Responsive text */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-dark-text-secondary max-w-xl px-4">
              A hyper-local marketplace connecting community chefs with customers and drivers.
            </p>

            {/* Hero Image - Responsive height */}
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
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

            {/* Primary CTA Button - Touch-friendly */}
            <div className="w-full max-w-md pt-2 sm:pt-4 px-4">
              <Link
                href="/explore"
                className="block px-6 sm:px-8 py-5 sm:py-6 bg-brand-burgundy text-white font-bold text-lg sm:text-xl rounded-xl sm:rounded-2xl hover:bg-customer-500 active:scale-95 transition-all shadow-xl sm:shadow-2xl hover:shadow-3xl touch-manipulation flex items-center justify-center gap-2 sm:gap-3"
              >
                <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" />
                <span>Browse Local Chefs</span>
              </Link>
              
              {/* Secondary Links for Chefs/Drivers - Better spacing on mobile */}
              <p className="text-center mt-5 sm:mt-6 text-sm sm:text-base text-gray-600 dark:text-dark-text-secondary px-2">
                Want to cook or deliver?{' '}
                <Link href="/apply/chef" className="text-brand-coral dark:text-chef-500 font-semibold hover:underline touch-manipulation inline-block py-1">
                  Apply as a Chef
                </Link>
                {' '}or{' '}
                <Link href="/apply/driver" className="text-brand-teal dark:text-primary-dark font-semibold hover:underline touch-manipulation inline-block py-1">
                  Driver
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Statistics - Mobile/Tablet Optimized with Grid */}
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-dark-bg-elevated dark:to-dark-bg py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-dark-text mb-2 px-4">
              Join Thousands of Happy Neighbors
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-dark-text-secondary px-4">
              Our growing community loves local food
            </p>
          </div>
          
          {/* Grid layout for tablet/desktop, vertical for mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-xl md:max-w-4xl mx-auto">
            {/* Stat 1 */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 flex items-center gap-4 sm:gap-6 animate-fadeIn border border-transparent dark:border-dark-border hover:scale-105 transition-transform touch-manipulation">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0">
                <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-customer-500 dark:text-red-400" />
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-dark-text">500+</div>
                <div className="text-gray-600 dark:text-dark-text-secondary font-semibold text-base sm:text-lg mt-1">Local Chefs</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 flex items-center gap-4 sm:gap-6 animate-fadeIn border border-transparent dark:border-dark-border hover:scale-105 transition-transform touch-manipulation" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0">
                <UtensilsCrossed className="w-10 h-10 sm:w-12 sm:h-12 text-brand-coral dark:text-orange-400" />
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-dark-text">10,000+</div>
                <div className="text-gray-600 dark:text-dark-text-secondary font-semibold text-base sm:text-lg mt-1">Meals Delivered</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 flex items-center gap-4 sm:gap-6 animate-fadeIn border border-transparent dark:border-dark-border hover:scale-105 transition-transform touch-manipulation" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0">
                <Star className="w-10 h-10 sm:w-12 sm:h-12 text-brand-teal dark:text-cyan-400 fill-brand-teal dark:fill-cyan-400" />
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-dark-text">4.8</div>
                <div className="text-gray-600 dark:text-dark-text-secondary font-semibold text-base sm:text-lg mt-1">Average Rating</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 flex items-center gap-4 sm:gap-6 animate-fadeIn border border-transparent dark:border-dark-border hover:scale-105 transition-transform touch-manipulation" style={{ animationDelay: '0.3s' }}>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-100 to-orange-200 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-customer-500 dark:text-red-400" />
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-dark-text">80-85%</div>
                <div className="text-gray-600 dark:text-dark-text-secondary font-semibold text-base sm:text-lg mt-1">Goes to Chefs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Mobile/Tablet Optimized */}
      <div className="bg-white dark:bg-dark-bg-secondary py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-3 sm:mb-4 px-4">How It Works</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-text-secondary px-4">From browsing to delivery in four simple steps</p>
          </div>

          <div className="relative">
            {/* Connecting line - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:block absolute left-12 lg:left-16 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-brand-burgundy via-brand-coral to-brand-teal"></div>

            <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
              {/* Step 1 */}
              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 animate-fadeIn">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg dark:shadow-xl dark:shadow-black/20">
                  <Search className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-customer-500 dark:text-red-400" />
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-customer-500 dark:bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
                    1
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left sm:pt-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text mb-2 sm:mb-3">Browse</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-base sm:text-lg leading-relaxed px-4 sm:px-0">
                    Find local chefs nearby. Filter by cuisine, diet, or distance to discover the perfect meal.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg dark:shadow-xl dark:shadow-black/20">
                  <Video className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-brand-coral dark:text-orange-400" />
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-brand-coral dark:bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
                    2
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left sm:pt-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text mb-2 sm:mb-3">Watch Live</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-base sm:text-lg leading-relaxed px-4 sm:px-0">
                    See chefs cook in real-time. Build trust and authenticity by watching your food being prepared.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg dark:shadow-xl dark:shadow-black/20">
                  <ShoppingCart className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-brand-teal dark:text-cyan-400" />
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-brand-teal dark:bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
                    3
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left sm:pt-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text mb-2 sm:mb-3">Order</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-base sm:text-lg leading-relaxed px-4 sm:px-0">
                    Place your order securely. Pay safely and support your local community with every purchase.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-cyan-100 to-blue-200 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg dark:shadow-xl dark:shadow-black/20">
                  <Car className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-brand-teal dark:text-cyan-400" />
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 bg-brand-teal dark:bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg sm:text-xl shadow-lg">
                    4
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left sm:pt-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text mb-2 sm:mb-3">Delivered</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-base sm:text-lg leading-relaxed px-4 sm:px-0">
                    Fast local delivery. Get fresh food from your neighbor's kitchen delivered right to your door.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Dishes Showcase - Mobile/Tablet Optimized with Grid */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-dark-bg-elevated py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-3 sm:mb-4 px-4">
              Popular Dishes from Local Chefs
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-text-secondary px-4">
              Discover what your neighbors are cooking today
            </p>
          </div>

          {/* Grid for tablet/desktop, vertical for mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Dish Card 1 - Gourmet Burger */}
            <Link href="/explore" className="block">
              <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-transparent dark:border-dark-border hover:scale-105 touch-manipulation">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop"
                    alt="Gourmet burger with fresh ingredients"
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text mb-1 sm:mb-2">Signature Burger</h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text-muted mb-3 sm:mb-4">by Chef Maria's Kitchen</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                        <span className="text-base sm:text-lg font-semibold dark:text-dark-text">4.9</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-dark-text-secondary text-sm sm:text-base">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>25 min</span>
                      </div>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text">$18</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Dish Card 2 - Fresh Salad */}
            <Link href="/explore" className="block">
              <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-transparent dark:border-dark-border hover:scale-105 touch-manipulation">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop"
                    alt="Fresh healthy salad bowl"
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text mb-1 sm:mb-2">Buddha Bowl</h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text-muted mb-3 sm:mb-4">by Green Life Kitchen</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                        <span className="text-base sm:text-lg font-semibold dark:text-dark-text">4.8</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-dark-text-secondary text-sm sm:text-base">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>20 min</span>
                      </div>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text">$16</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Dish Card 3 - Artisan Pizza */}
            <Link href="/explore" className="block md:col-span-2 lg:col-span-1">
              <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-transparent dark:border-dark-border hover:scale-105 touch-manipulation">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop"
                    alt="Artisan wood-fired pizza"
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text mb-1 sm:mb-2">Margherita Pizza</h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text-muted mb-3 sm:mb-4">by Tony's Pizzeria</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                        <span className="text-base sm:text-lg font-semibold dark:text-dark-text">4.9</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-dark-text-secondary text-sm sm:text-base">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>30 min</span>
                      </div>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-dark-text">$22</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Single Explore CTA - Touch-friendly */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              href="/explore"
              className="inline-block px-10 sm:px-12 py-4 sm:py-5 bg-brand-burgundy text-white font-bold text-lg sm:text-xl rounded-xl sm:rounded-2xl hover:bg-customer-500 active:scale-95 transition-all shadow-lg hover:shadow-xl touch-manipulation"
            >
              Explore All Dishes
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section - Moved to #5 Position */}
      <div className="max-w-2xl mx-auto px-4 py-20 bg-gray-50 dark:bg-dark-bg">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-4">
            Why Choose NeighborEats?
          </h2>
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
            The better way to order food
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-dark-bg-elevated rounded-3xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:shadow-2xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-10 h-10 text-customer-500 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-dark-text">Hyper-Local</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg leading-relaxed">
                  Find chefs within 0.5-15 miles. Support your actual neighbors and get the freshest meals delivered quickly.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-3xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:shadow-2xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Video className="w-10 h-10 text-brand-coral dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-dark-text">LIVE Cooking</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg leading-relaxed">
                  Watch chefs cook in real-time. Build trust and authenticity by seeing your food being prepared live.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-3xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:shadow-2xl transition-all duration-300 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-10 h-10 text-brand-teal dark:text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-dark-text">Fair Economics</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg leading-relaxed">
                  Chefs keep 80-85%. Drivers earn $4-5 per delivery. You save money. Everyone wins with fair pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Section - NEW #6 Position */}
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-dark-bg-elevated dark:to-dark-bg py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-4">
              Better Than Big Delivery Apps
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
              See how we compare to DoorDash, UberEats, and others
            </p>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-3xl p-8 md:p-12 shadow-2xl dark:shadow-xl dark:shadow-black/30 border border-transparent dark:border-dark-border">
            <div className="flex flex-col gap-8">
              {/* Comparison 1 */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">30-50% Cheaper</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                    Lower fees mean lower prices. Save money on every order compared to traditional delivery apps.
                  </p>
                </div>
              </div>

              {/* Comparison 2 */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Fresher Food</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                    Made right in your neighborhood. No long distances or cold meals from far-away restaurants.
                  </p>
                </div>
              </div>

              {/* Comparison 3 */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Support Neighbors, Not Corporations</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                    80-85% goes directly to local chefs. Your money stays in your community.
                  </p>
                </div>
              </div>

              {/* Comparison 4 */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-brand-coral/20 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Video className="w-8 h-8 text-brand-coral dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Watch Chefs Cook LIVE</h3>
                  <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                    Something no other app offers. See your food being made in real-time for ultimate trust and transparency.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border">
              <Link
                href="/explore"
                className="block w-full px-8 py-5 bg-brand-burgundy text-white font-bold text-xl rounded-2xl hover:bg-customer-500 transition-all shadow-lg hover:shadow-xl text-center"
              >
                Try NeighborEats Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Community - Moved to #7 Position (Customer-Focused) */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg-secondary dark:to-dark-bg-elevated py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-4">
              Loved By Your Neighbors
            </h2>
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary">
              Real people. Real food. Real connections.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Customer Testimonial 1 - NEW */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-3xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-dark-border">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-customer-100 to-customer-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center flex-shrink-0 text-3xl">
                  👨‍💼
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-dark-text-secondary text-lg leading-relaxed mb-4 italic">
                    "I order from Chef Maria twice a week now. The food is amazing and watching her cook live gives me confidence in the quality. Way better than DoorDash!"
                  </p>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text">Michael Rodriguez</h4>
                    <p className="text-gray-500 dark:text-dark-text-muted">Brooklyn, NY · Customer since 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Testimonial 2 - NEW */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-3xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-dark-border">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-customer-100 to-customer-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center flex-shrink-0 text-3xl">
                  👩‍⚕️
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-dark-text-secondary text-lg leading-relaxed mb-4 italic">
                    "As a busy nurse, I love supporting local chefs in my neighborhood. The meals are fresh, affordable, and I feel good knowing my money goes to real people."
                  </p>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text">Emily Watson</h4>
                    <p className="text-gray-500 dark:text-dark-text-muted">Portland, OR · Customer since 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chef Card - Simplified */}
            <div className="bg-white dark:bg-dark-bg-elevated rounded-3xl overflow-hidden shadow-lg dark:shadow-xl dark:shadow-black/20 hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-dark-border">
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
                <h3 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-2">Connie Jones</h3>
                <p className="text-customer-500 dark:text-red-400 font-bold text-lg mb-4">Italian Cuisine Specialist</p>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg leading-relaxed mb-6">
                  "I love sharing my grandmother's recipes with the neighborhood. NeighborEats lets me turn my passion into income while staying independent."
                </p>
                <div className="flex items-center gap-2 text-gray-500 dark:text-dark-text-muted">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">Brooklyn, NY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Chef/Driver CTA */}
          <div className="text-center mt-16 pt-12 border-t border-gray-200 dark:border-dark-border">
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary mb-6">
              Love to cook or drive?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply/chef"
                className="px-8 py-3 bg-brand-coral text-white font-semibold rounded-xl hover:bg-amber-600 transition-all shadow-md"
              >
                Become a Chef
              </Link>
              <Link
                href="/apply/driver"
                className="px-8 py-3 bg-driver-500 text-white font-semibold rounded-xl hover:bg-brand-teal transition-all shadow-md"
              >
                Drive & Deliver
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Final Strong CTA Section - NEW #8 Position */}
      <div className="bg-gradient-to-br from-brand-burgundy to-customer-600 dark:from-brand-burgundy/90 dark:to-customer-700 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Discover Amazing Food?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-xl mx-auto">
            Join thousands of happy neighbors enjoying fresh, local meals from talented chefs in your community.
          </p>
          
          <Link
            href="/explore"
            className="inline-block px-12 py-6 bg-white dark:bg-dark-bg-elevated text-brand-burgundy dark:text-dark-text font-bold text-xl rounded-2xl hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
          >
            <span className="flex items-center gap-3">
              <ShoppingCart className="w-7 h-7" />
              Start Exploring Local Chefs
            </span>
          </Link>

          <p className="text-white/80 mt-8 text-lg">
            No commitment. Browse chefs for free.
          </p>
        </div>
      </div>

      {/* Login Section - #9 Position (Final) */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-dark-bg-secondary dark:to-dark-bg py-16 border-t border-gray-200 dark:border-dark-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl text-gray-700 dark:text-dark-text-secondary">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-customer-500 dark:text-red-400 font-bold hover:text-brand-burgundy dark:hover:text-red-300 hover:underline transition text-2xl">
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


