'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Car, DollarSign, Clock, MapPin, CheckCircle, TrendingUp } from 'lucide-react'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import Select from '@/components/shared/Select'
import Modal from '@/components/shared/Modal'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import DarkModeToggle from '@/components/shared/DarkModeToggle'

export default function BecomeADriverPage() {
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
    vehicleType: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    licensePlate: '',
    insuranceProvider: '',
    drivingExperience: '',
    availability: '',
    whyJoin: '',
  })
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Personal Information', 'Vehicle Information', 'Experience & Availability']
  const stepRequirements: string[][] = [
    ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'],
    ['vehicleType', 'vehicleYear', 'vehicleMake', 'vehicleModel', 'licensePlate', 'insuranceProvider'],
    ['drivingExperience', 'availability', 'whyJoin'],
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
            <Car className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-dark-text mb-6">
            Drive & Deliver
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto mb-8">
            Earn money on your schedule. Deliver fresh, local food and meet amazing people in your community.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="px-10 py-5 bg-brand-teal hover:bg-driver-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-dark-text mb-12 text-center">Why Drive with NeighborEats?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-teal/10 dark:bg-brand-teal/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-7 h-7 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Earn $4-5 Per Delivery</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Fair pay for every delivery. Plus tips! Average $15-25 per hour.
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Flexible Hours</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Drive when you want. Work full-time, part-time, or just weekends.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl p-8 shadow-lg dark:shadow-xl dark:shadow-black/20 border border-gray-100 dark:border-dark-border hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-brand-teal/10 dark:bg-brand-teal/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">Short Distances</h3>
                <p className="text-gray-600 dark:text-dark-text-secondary text-lg">
                  Hyper-local deliveries. Most routes are under 5 miles.
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
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Valid driver's license and clean driving record</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Reliable vehicle (car, truck, or SUV) in good condition</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Valid auto insurance with proof of coverage</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Smartphone with data plan (iOS or Android)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-dark-text-secondary text-lg">Must be 21+ years old</span>
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
            className="px-12 py-5 bg-brand-teal hover:bg-driver-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            Start Your Application
          </button>
        </div>
      </div>

      {/* Application Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Driver Application">
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
          )}

          {currentStep === 1 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Vehicle Type"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                  options={[
                    { value: '', label: 'Select vehicle type' },
                    { value: 'car', label: 'Car' },
                    { value: 'suv', label: 'SUV' },
                    { value: 'truck', label: 'Truck' },
                    { value: 'van', label: 'Van' },
                  ]}
                />
                <Input
                  label="Vehicle Year"
                  name="vehicleYear"
                  value={formData.vehicleYear}
                  onChange={handleChange}
                  required
                  placeholder="2020"
                />
                <Input
                  label="Vehicle Make"
                  name="vehicleMake"
                  value={formData.vehicleMake}
                  onChange={handleChange}
                  required
                  placeholder="Honda"
                />
                <Input
                  label="Vehicle Model"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  required
                  placeholder="Civic"
                />
                <Input
                  label="License Plate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  required
                  placeholder="ABC1234"
                />
                <Input
                  label="Insurance Provider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  required
                  placeholder="State Farm"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-4">Experience & Availability</h3>
              <div className="space-y-4">
                <Select
                  label="Driving Experience"
                  name="drivingExperience"
                  value={formData.drivingExperience}
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
                  label="Why do you want to drive for NeighborEats?"
                  name="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  required
                  placeholder="Tell us why you're interested in delivering for NeighborEats and serving your local community..."
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
                className="flex-1 w-full bg-brand-teal hover:bg-driver-600 text-white py-4 text-lg"
              >
                Submit Application
              </Button>
            ) : (
              <Button
                type="button"
                className="flex-1 w-full bg-brand-teal hover:bg-driver-600 text-white py-4 text-lg"
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
