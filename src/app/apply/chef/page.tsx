'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChefHat, DollarSign, Clock, Users, CheckCircle, Upload } from 'lucide-react'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import Select from '@/components/shared/Select'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function BecomeAChefPage() {
  const router = useRouter()
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
    // Simulate API call
    toast.loading('Submitting application...')
    setTimeout(() => {
      toast.dismiss()
      toast.success('Application submitted! We\'ll contact you within 2-3 business days.')
      router.push('/')
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4">
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
            <Link href="/" className="text-gray-700 hover:text-brand-teal transition">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-brand-coral/10 to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-brand-coral transition mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-coral rounded-full mb-6">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Become a Chef
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Turn your passion for cooking into income. Share your culinary creations with your local community.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Join NeighborEats?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Keep 80-85%</h3>
                <p className="text-gray-600">
                  You keep the majority of your earnings. No hidden fees or unfair commissions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Schedule</h3>
                <p className="text-gray-600">
                  Cook when you want. Set your own hours and availability.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Build Your Brand</h3>
                <p className="text-gray-600">
                  Grow your reputation and build a loyal customer base in your community.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-brand-coral" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Simple Process</h3>
                <p className="text-gray-600">
                  Easy onboarding, dedicated support, and tools to help you succeed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-brand-coral/5 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Valid food handler's certificate (or willing to obtain)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Access to a clean, licensed kitchen space</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Passion for cooking and sharing your culinary creations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Ability to prepare consistent, quality meals</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-coral flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Valid ID and proof of address</span>
            </li>
          </ul>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply Now</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Culinary Background</h3>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About You</h3>
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
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-brand-coral hover:bg-amber-600 text-white py-4 text-lg"
              >
                Submit Application
              </Button>
              <p className="text-sm text-gray-500 text-center mt-4">
                We'll review your application and get back to you within 2-3 business days.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
