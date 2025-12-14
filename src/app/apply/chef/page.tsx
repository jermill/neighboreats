'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChefHat, DollarSign, Clock, Users, CheckCircle, X } from 'lucide-react'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import Select from '@/components/shared/Select'
import Modal from '@/components/shared/Modal'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import DarkModeToggle from '@/components/shared/DarkModeToggle'

export default function BecomeAChefPage() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cuisineSpecialties: '',
    yearsOfExperience: '',
    kitchenType: '',
    certifications: '',
    availability: '',
    whyJoin: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.loading('Submitting application...')
    setTimeout(() => {
      toast.dismiss()
      toast.success('Application submitted! We\'ll contact you within 2-3 business days.')
      setShowModal(false)
      setTimeout(() => router.push('/'), 1000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-white via-40% to-gray-50 dark:from-dark-bg dark:via-dark-bg-secondary dark:via-40% dark:to-dark-bg-elevated">
      {/* Header */}
      <nav className="bg-white dark:bg-dark-bg-elevated shadow-md sticky top-0 z-40 border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="NeighborEats"
                width={160}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <Link 
              href="/" 
              className="px-5 py-2.5 bg-brand-teal dark:bg-primary-dark text-white rounded-xl hover:bg-brand-teal/90 dark:hover:bg-primary-dark/90 transition font-semibold shadow-md"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand-coral to-amber-600 rounded-3xl mb-8 shadow-2xl">
            <ChefHat className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-dark-text mb-6">
            Become a Chef
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto mb-8">
            Turn your passion for cooking into income. Share your culinary creations with your local community.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="px-10 py-5 bg-brand-coral hover:bg-amber-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-dark-text mb-12 text-center">Why Join NeighborEats?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-coral/10 dark:bg-brand-coral/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-7 h-7 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Keep 80-85%</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  You keep the majority of your earnings. No hidden fees or unfair commissions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-coral/10 dark:bg-brand-coral/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Flexible Schedule</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Cook when you want. Set your own hours and availability.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-coral/10 dark:bg-brand-coral/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Build Your Brand</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Grow your reputation and build a loyal customer base in your community.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-coral/10 dark:bg-brand-coral/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-7 h-7 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Simple Process</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Easy onboarding, dedicated support, and tools to help you succeed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-brand-coral/5 dark:bg-brand-coral/10 rounded-2xl p-8 mb-12 border border-brand-coral/20 dark:border-brand-coral/30">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-6">Requirements</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Valid food handler's certificate (or willing to obtain)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Access to a clean, licensed kitchen space</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Passion for cooking and sharing your culinary creations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Ability to prepare consistent, quality meals</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Valid ID and proof of address</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-12 py-5 bg-brand-coral hover:bg-amber-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            Start Your Application
          </button>
        </div>
      </div>

      {/* Application Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Chef Application">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(302) 555-0100"
              />
              <Input
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="123 Main St"
              />
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Wilmington"
              />
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="DE"
              />
              <Input
                label="Zip Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                placeholder="19801"
              />
            </div>
          </div>

          {/* Culinary Background */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">Culinary Background</h3>
            <div className="space-y-4">
              <Input
                label="Cuisine Specialties"
                name="cuisineSpecialties"
                value={formData.cuisineSpecialties}
                onChange={handleChange}
                required
                placeholder="e.g., Italian, Mexican, Vegan"
              />
              <Select
                label="Years of Cooking Experience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
                options={[
                  { value: '', label: 'Select years' },
                  { value: '0-2', label: '0-2 years' },
                  { value: '3-5', label: '3-5 years' },
                  { value: '6-10', label: '6-10 years' },
                  { value: '10+', label: '10+ years' },
                ]}
              />
              <Select
                label="Kitchen Type"
                name="kitchenType"
                value={formData.kitchenType}
                onChange={handleChange}
                required
                options={[
                  { value: '', label: 'Select kitchen type' },
                  { value: 'home', label: 'Home Kitchen' },
                  { value: 'commercial', label: 'Commercial Kitchen' },
                  { value: 'shared', label: 'Shared Kitchen Space' },
                ]}
              />
              <Input
                label="Certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="Food Handler's Certificate, ServSafe, etc."
              />
            </div>
          </div>

          {/* Availability & Motivation */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">About You</h3>
            <div className="space-y-4">
              <Textarea
                label="Weekly Availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                placeholder="e.g., Weekdays 5-9pm, Weekends 10am-8pm"
                rows={3}
              />
              <Textarea
                label="Why do you want to join NeighborEats?"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                required
                placeholder="Tell us about your passion for cooking and why you want to share your food with the community..."
                rows={5}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
            <Button
              type="submit"
              className="w-full bg-brand-coral hover:bg-amber-600 text-white py-4 text-lg"
            >
              Submit Application
            </Button>
            <p className="text-sm text-gray-500 dark:text-dark-text-muted text-center mt-4">
              We'll review your application and get back to you within 2-3 business days.
            </p>
          </div>
        </form>
      </Modal>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />
    </div>
  )
}
