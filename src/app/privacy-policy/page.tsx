'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
            <strong>Effective Date:</strong> December 14, 2025<br />
            <strong>Last Updated:</strong> December 14, 2025
          </p>

          <div className="space-y-8 text-gray-700 dark:text-dark-text-secondary">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to NeighborEats ("we," "our," or "us"). We are committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you use our platform.
              </p>
              <p>
                By using NeighborEats, you agree to the collection and use of information in accordance with this policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, phone number, password, and profile photo</li>
                <li><strong>Profile Details:</strong> Delivery address, payment methods, dietary preferences</li>
                <li><strong>Chef/Driver Information:</strong> Business details, kitchen address, vehicle information, certifications, background check consent</li>
                <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely through Stripe)</li>
                <li><strong>Communications:</strong> Messages, reviews, ratings, and support inquiries</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform, search queries</li>
                <li><strong>Device Information:</strong> IP address, browser type, device type, operating system</li>
                <li><strong>Location Data:</strong> Approximate location based on IP address, precise location (with your permission) for delivery services</li>
                <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to track activity and improve your experience</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our platform</li>
                <li>Process orders, payments, and deliveries</li>
                <li>Connect customers with chefs and drivers</li>
                <li>Send order confirmations, updates, and notifications</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Verify identities and conduct background checks (for chefs and drivers)</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Analyze usage patterns and improve our services</li>
                <li>Send promotional materials and updates (with your consent)</li>
                <li>Comply with legal obligations and enforce our Terms of Service</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">4. How We Share Your Information</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">4.1 With Service Providers</h3>
              <p className="mb-4">We share information with third-party service providers who help us operate our platform:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Payment Processing:</strong> Stripe (for payment and payout processing)</li>
                <li><strong>Background Checks:</strong> Checkr (for chef and driver verification)</li>
                <li><strong>Communications:</strong> SendGrid (for email notifications)</li>
                <li><strong>Live Streaming:</strong> Agora (for live cooking sessions)</li>
                <li><strong>Database & Hosting:</strong> Supabase, Netlify (for data storage and hosting)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">4.2 Between Users</h3>
              <p className="mb-4">
                When you place an order, we share necessary information between parties to facilitate the transaction:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Customers can see chef names, photos, menus, and kitchen locations</li>
                <li>Chefs receive customer names, delivery addresses, and order details</li>
                <li>Drivers receive pickup and delivery addresses and customer contact information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">4.3 Legal Requirements</h3>
              <p className="mb-4">We may disclose your information if required by law or to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with legal processes, court orders, or government requests</li>
                <li>Protect our rights, property, or safety, or that of our users</li>
                <li>Investigate fraud, security issues, or Terms of Service violations</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security audits and monitoring</li>
                <li>PCI DSS compliant payment processing through Stripe</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive 
                to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. 
                When you delete your account, we will delete or anonymize your personal information within 90 days, except where we 
                are required to retain it for legal, tax, or regulatory purposes.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">7. Your Privacy Rights</h2>
              <p className="mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and personal data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <a href="mailto:privacy@neighboreats.com" className="text-brand-teal hover:underline">privacy@neighboreats.com</a>
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies, web beacons, and similar technologies to enhance your experience. You can control cookies through 
                your browser settings, but disabling cookies may limit your ability to use certain features of our platform.
              </p>
              <p>
                <strong>Types of cookies we use:</strong>
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">9. Third-Party Links</h2>
              <p>
                Our platform may contain links to third-party websites or services. We are not responsible for the privacy 
                practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">10. Children's Privacy</h2>
              <p>
                NeighborEats is not intended for children under 18 years of age. We do not knowingly collect personal information 
                from children. If you are a parent or guardian and believe your child has provided us with personal information, 
                please contact us immediately.
              </p>
            </section>

            {/* California Privacy Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">11. California Privacy Rights (CCPA)</h2>
              <p className="mb-4">
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to know what personal information is collected, used, shared, or sold</li>
                <li>Right to delete personal information (subject to certain exceptions)</li>
                <li>Right to opt-out of the sale of personal information (we do not sell your data)</li>
                <li>Right to non-discrimination for exercising your privacy rights</li>
              </ul>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the 
                new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of NeighborEats after 
                changes are posted constitutes your acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-dark-text">NeighborEats</p>
                <p>Email: <a href="mailto:privacy@neighboreats.com" className="text-brand-teal hover:underline">privacy@neighboreats.com</a></p>
                <p>Support: <a href="mailto:support@neighboreats.com" className="text-brand-teal hover:underline">support@neighboreats.com</a></p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="border-t border-gray-200 dark:border-dark-border pt-6">
              <p className="text-sm text-gray-600 dark:text-dark-text-muted italic">
                By using NeighborEats, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
