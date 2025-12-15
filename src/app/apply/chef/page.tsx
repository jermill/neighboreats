'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChefHat, DollarSign, Clock, Users, CheckCircle, TrendingUp } from 'lucide-react'
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
    kitchenAddress: '',
    city: '',
    state: '',
    zipCode: '',
    cuisineSpecialties: '',
    yearsExperience: '',
    certifications: '',
    kitchenType: '',
    weeklyCapacity: '',
    whyJoin: '',
  })
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Personal Information', 'Kitchen Details', 'Experience & Availability']
  const stepRequirements: string[][] = [
    ['fullName', 'email', 'phone', 'kitchenAddress', 'city', 'state', 'zipCode'],
    ['cuisineSpecialties', 'kitchenType', 'certifications'],
    ['yearsExperience', 'weeklyCapacity', 'whyJoin'],
  ]

  useEffect(() => {
    if (showModal) {
      setCurrentStep(0)
    }
  }, [showModal])

  const validateStep = (stepIndex: number) => {
    const requiredFields = stepRequirements[stepIndex]
    if (!requiredFields) return true
    const missingField = requiredFields.find((field) => {
      const value = formData[field as keyof typeof formData]
      return !value?.toString().trim()
    })
    if (missingField) {
      toast.error('Please complete all required fields on this step before continuing.')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const invalidStep = stepRequirements.findIndex((fields) =>
      fields.some((field) => !formData[field as keyof typeof formData]?.toString().trim())
    )
    if (invalidStep !== -1) {
      setCurrentStep(invalidStep)
      toast.error('Please complete every step before submitting your application.')
      return
    }
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

  const isLastStep = currentStep === steps.length - 1
  const progressPercent =
    steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 100

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
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand-teal to-cyan-600 rounded-3xl mb-8 shadow-2xl">
            <ChefHat className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-dark-text mb-6">
            Cook & Share
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto mb-8">
            Turn your passion for cooking into income. Share your culinary creations with your community.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="px-10 py-5 bg-brand-teal hover:bg-chef-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-dark-text mb-12 text-center">Why Cook with NeighborEats?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-teal/10 dark:bg-brand-teal/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-7 h-7 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Keep 85% of Sales</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Fair commission rates. Earn more from every meal you sell.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-teal/10 dark:bg-brand-teal/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Cook on Your Schedule</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Set your own hours. Cook when it works for you, from your own kitchen.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-teal/10 dark:bg-brand-teal/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Build Your Community</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Connect with local food lovers. Build a loyal subscriber base.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-teal/10 dark:bg-brand-teal/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-7 h-7 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Weekly Payouts</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Get paid every week. Fast, reliable deposits directly to your account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-brand-teal/5 dark:bg-brand-teal/10 rounded-2xl p-8 mb-12 border border-brand-teal/20 dark:border-brand-teal/30">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-6">Requirements</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Food handler's certificate or ServSafe certification</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Clean, inspected kitchen (home or commercial)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Proof of business license and liability insurance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Passion for cooking and serving your community</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Must be 18+ years old</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Pass a background check</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-12 py-5 bg-brand-teal hover:bg-chef-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            Start Your Application
          </button>
        </div>
      </div>

      {/* Application Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Chef Application">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-medium text-gray-600 dark:text-dark-text-secondary">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{steps[currentStep]}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-dark-border">
              <div
                className="h-full bg-brand-teal transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {currentStep === 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Jane Smith"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="jane@example.com"
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
                  label="Kitchen Address"
                  name="kitchenAddress"
                  value={formData.kitchenAddress}
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
          )}

          {currentStep === 1 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">Kitchen Details</h3>
              <div className="space-y-4">
                <Textarea
                  label="Cuisine Specialties"
                  name="cuisineSpecialties"
                  value={formData.cuisineSpecialties}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Italian, Mexican, Vegan, BBQ"
                  rows={2}
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
                    { value: 'shared', label: 'Shared/Co-op Kitchen' },
                  ]}
                />
                <Textarea
                  label="Certifications & Licenses"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  required
                  placeholder="List your food handler's certificates, culinary degrees, or relevant certifications"
                  rows={3}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">Experience & Availability</h3>
              <div className="space-y-4">
                <Select
                  label="Years of Cooking Experience"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  required
                  options={[
                    { value: '', label: 'Select years' },
                    { value: '1-3', label: '1-3 years' },
                    { value: '4-6', label: '4-6 years' },
                    { value: '7-10', label: '7-10 years' },
                    { value: '10+', label: '10+ years' },
                  ]}
                />
                <Select
                  label="Weekly Cooking Capacity"
                  name="weeklyCapacity"
                  value={formData.weeklyCapacity}
                  onChange={handleChange}
                  required
                  options={[
                    { value: '', label: 'Select capacity' },
                    { value: '10-25', label: '10-25 meals/week' },
                    { value: '25-50', label: '25-50 meals/week' },
                    { value: '50-100', label: '50-100 meals/week' },
                    { value: '100+', label: '100+ meals/week' },
                  ]}
                />
                <Textarea
                  label="Why do you want to cook for NeighborEats?"
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your passion for cooking and what makes your food special..."
                  rows={5}
                />
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200 dark:border-dark-border flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            {isLastStep ? (
              <Button
                type="submit"
                className="flex-1 w-full bg-brand-teal hover:bg-chef-600 text-white py-4 text-lg"
              >
                Submit Application
              </Button>
            ) : (
              <Button
                type="button"
                className="flex-1 w-full bg-brand-teal hover:bg-chef-600 text-white py-4 text-lg"
                onClick={() => {
                  if (!validateStep(currentStep)) {
                    return
                  }
                  setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
                }}
              >
                Continue
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-dark-text-muted text-center mt-4">
            We'll review your application and get back to you within 2-3 business days.
          </p>
        </form>
      </Modal>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />
    </div>
  )
}
