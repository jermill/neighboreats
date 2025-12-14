'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Car, DollarSign, Clock, MapPin, CheckCircle, TrendingUp } from 'lucide-react'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import Select from '@/components/shared/Select'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function BecomeADriverPage() {
  const router = useRouter()
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
      <div className="bg-gradient-to-b from-brand-teal/10 to-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-brand-teal transition mb-8">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-teal rounded-full mb-6">
              <Car className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Drive & Deliver
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Earn money on your schedule. Deliver fresh, local food and meet amazing people in your community.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Drive with NeighborEats?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Earn $4-5 Per Delivery</h3>
                <p className="text-gray-600">
                  Fair pay for every delivery. Plus tips! Average $15-25 per hour.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Hours</h3>
                <p className="text-gray-600">
                  Drive when you want. Work full-time, part-time, or just weekends.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Short Distances</h3>
                <p className="text-gray-600">
                  Hyper-local deliveries. Most routes are under 5 miles.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-brand-teal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Weekly Payouts</h3>
                <p className="text-gray-600">
                  Get paid every week. Fast, reliable deposits directly to your account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-brand-teal/5 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Valid driver's license and clean driving record</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Reliable vehicle (car, truck, or SUV) in good condition</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Valid auto insurance with proof of coverage</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Smartphone with data plan (iOS or Android)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Must be 21+ years old</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Pass a background check</span>
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

            {/* Vehicle Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Information</h3>
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

            {/* Experience & Availability */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Experience & Availability</h3>
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

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-brand-teal hover:bg-driver-600 text-white py-4 text-lg"
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
