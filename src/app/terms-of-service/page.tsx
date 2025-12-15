'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-text mb-4">Terms of Service</h1>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
            <strong>Effective Date:</strong> December 14, 2025<br />
            <strong>Last Updated:</strong> December 14, 2025
          </p>

          <div className="space-y-8 text-gray-700 dark:text-dark-text-secondary">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                Welcome to NeighborEats ("Platform," "we," "us," or "our"). These Terms of Service ("Terms") govern your 
                access to and use of our platform, including our website, mobile applications, and related services.
              </p>
              <p className="mb-4">
                By accessing or using NeighborEats, you agree to be bound by these Terms and our Privacy Policy. If you 
                do not agree with any part of these Terms, you must not use our platform.
              </p>
              <p>
                <strong>PLEASE READ THESE TERMS CAREFULLY. THEY CONTAIN IMPORTANT INFORMATION ABOUT YOUR RIGHTS AND OBLIGATIONS, 
                INCLUDING LIMITATIONS ON LIABILITY AND A REQUIREMENT TO ARBITRATE DISPUTES.</strong>
              </p>
            </section>

            {/* Platform Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">2. Platform Description</h2>
              <p className="mb-4">
                NeighborEats is a marketplace platform that connects:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Customers</strong> who wish to purchase homemade meals and food items</li>
                <li><strong>Chefs</strong> who prepare and sell food through our platform (independent contractors)</li>
                <li><strong>Drivers</strong> who provide delivery services (independent contractors)</li>
              </ul>
              <p className="mt-4 font-semibold text-gray-900 dark:text-dark-text">
                ⚠️ IMPORTANT: NeighborEats is a technology platform only. We facilitate connections between users but are 
                NOT a food service provider, restaurant, catering company, or delivery service.
              </p>
            </section>

            {/* Independent Contractor Relationship */}
            <section className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">
                ⚠️ 3. Independent Contractor Relationship - LIMITED LIABILITY
              </h2>
              
              <div className="space-y-4">
                <p className="font-bold text-lg text-gray-900 dark:text-dark-text">
                  3.1 Chefs and Drivers Are Independent Contractors
                </p>
                <p>
                  All chefs and drivers on NeighborEats are <strong>independent contractors</strong>, NOT employees, agents, 
                  partners, or representatives of NeighborEats. They operate their own independent businesses and are solely 
                  responsible for their own actions, products, and services.
                </p>

                <p className="font-bold text-lg text-gray-900 dark:text-dark-text">
                  3.2 NeighborEats Is NOT Responsible for Transactions
                </p>
                <p>
                  <strong className="text-red-600 dark:text-red-400">NeighborEats is NOT responsible for any business dealings, 
                  disputes, or issues between customers and chefs/drivers.</strong> This includes but is not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Food quality, safety, preparation, or presentation</li>
                  <li>Food allergies, dietary restrictions, or health concerns</li>
                  <li>Late deliveries, missed deliveries, or delivery errors</li>
                  <li>Incorrect orders or missing items</li>
                  <li>Damaged or spoiled food</li>
                  <li>Pricing disputes or billing errors</li>
                  <li>Cancellations or refunds</li>
                  <li>Personal injury or property damage</li>
                </ul>

                <p className="font-bold text-lg text-gray-900 dark:text-dark-text mt-4">
                  3.3 Contractors Are Responsible for All Issues
                </p>
                <p>
                  <strong>ALL CHEFS AND DRIVERS ARE SOLELY RESPONSIBLE FOR:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processing refunds for dissatisfied customers</li>
                  <li>Resolving disputes directly with customers</li>
                  <li>Maintaining appropriate insurance coverage</li>
                  <li>Complying with all food safety regulations and health codes</li>
                  <li>Obtaining necessary licenses, permits, and certifications</li>
                  <li>Paying all applicable taxes</li>
                  <li>Their own conduct and actions</li>
                </ul>

                <p className="font-bold text-lg text-gray-900 dark:text-dark-text mt-4">
                  3.4 Refund Policy
                </p>
                <p>
                  <strong className="text-red-600 dark:text-red-400">Customers must seek refunds directly from the chef or driver 
                  who provided the service.</strong> NeighborEats does not process refunds on behalf of contractors. We may 
                  facilitate communication between parties but are not obligated to resolve disputes or provide compensation.
                </p>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">4. User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">4.1 Account Registration</h3>
              <p className="mb-4">To use certain features, you must create an account. You agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as needed</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activity under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">4.2 Eligibility</h3>
              <p>You must be at least 18 years old to use NeighborEats. By using our platform, you represent that you meet this requirement.</p>
            </section>

            {/* Chef Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">5. Requirements for Chefs</h2>
              <p className="mb-4">If you register as a chef, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with all federal, state, and local food safety laws and regulations</li>
                <li>Obtain and maintain all required licenses, permits, and certifications</li>
                <li>Maintain a valid food handler's certificate</li>
                <li>Prepare food in a clean, licensed kitchen space</li>
                <li>Accurately represent your menu items, ingredients, and allergen information</li>
                <li>Maintain appropriate liability insurance</li>
                <li>Pass any required background checks</li>
                <li>Handle refunds and customer complaints directly</li>
                <li>Pay all applicable taxes on your earnings</li>
              </ul>
              <p className="mt-4 font-semibold">
                Failure to comply with these requirements may result in immediate suspension or termination of your account.
              </p>
            </section>

            {/* Driver Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">6. Requirements for Drivers</h2>
              <p className="mb-4">If you register as a driver, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Possess a valid driver's license and vehicle registration</li>
                <li>Maintain valid auto insurance that meets state requirements</li>
                <li>Pass a background check</li>
                <li>Provide reliable and timely delivery services</li>
                <li>Handle food safely during transport</li>
                <li>Communicate professionally with customers and chefs</li>
                <li>Handle delivery disputes and refunds directly with customers</li>
                <li>Pay all applicable taxes on your earnings</li>
              </ul>
            </section>

            {/* Customer Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">7. Customer Responsibilities</h2>
              <p className="mb-4">As a customer, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate delivery information</li>
                <li>Be available to receive deliveries at the specified time</li>
                <li>Communicate any dietary restrictions or allergies clearly</li>
                <li>Understand that you are purchasing directly from independent chefs</li>
                <li>Resolve any issues or disputes directly with the chef or driver</li>
                <li>Request refunds directly from the chef or driver, not from NeighborEats</li>
              </ul>
            </section>

            {/* Payments and Fees */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">8. Payments and Fees</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">8.1 Payment Processing</h3>
              <p className="mb-4">
                All payments are processed securely through our third-party payment processor (Stripe). By providing payment 
                information, you authorize us to charge your payment method for all fees incurred.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">8.2 Platform Fees</h3>
              <p className="mb-4">NeighborEats charges a service fee on transactions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chefs: 15-20% platform fee on each order</li>
                <li>Drivers: Delivery fees are split between driver and platform</li>
                <li>Customers: May be charged service fees and delivery fees</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">8.3 Refunds</h3>
              <p className="font-semibold text-red-600 dark:text-red-400">
                ⚠️ REFUNDS MUST BE REQUESTED FROM AND PROCESSED BY THE CHEF OR DRIVER, NOT NEIGHBOREATS.
              </p>
              <p className="mt-2">
                NeighborEats does not provide refunds for orders. All refund requests must be directed to the chef or driver 
                who fulfilled your order. We may facilitate communication but are not responsible for processing or guaranteeing refunds.
              </p>
            </section>

            {/* Prohibited Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">9. Prohibited Conduct</h2>
              <p className="mb-4">You may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Provide false or misleading information</li>
                <li>Impersonate another person or entity</li>
                <li>Sell alcohol, tobacco, or illegal substances</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Attempt to circumvent platform fees</li>
                <li>Use automated systems to access the platform (bots, scrapers)</li>
                <li>Interfere with platform operations or security</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-red-50 dark:bg-red-900/20 border-2 border-red-400 dark:border-red-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">
                ⚠️ 10. Limitation of Liability and Disclaimers
              </h2>
              
              <div className="space-y-4">
                <p className="font-bold text-lg uppercase text-gray-900 dark:text-dark-text">
                  10.1 Platform Provided "AS IS"
                </p>
                <p>
                  NEIGHBOREATS IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
                  WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                </p>

                <p className="font-bold text-lg uppercase text-gray-900 dark:text-dark-text">
                  10.2 No Liability for User Transactions
                </p>
                <p className="font-semibold text-red-600 dark:text-red-400">
                  NEIGHBOREATS IS NOT LIABLE FOR ANY DAMAGES, LOSSES, OR INJURIES ARISING FROM TRANSACTIONS BETWEEN USERS, 
                  INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Food poisoning, allergic reactions, or health issues from food</li>
                  <li>Poor food quality or incorrect orders</li>
                  <li>Late, missing, or damaged deliveries</li>
                  <li>Accidents, injuries, or property damage during delivery</li>
                  <li>Financial losses from disputed charges or refunds</li>
                  <li>Any conduct or actions of chefs or drivers</li>
                </ul>

                <p className="font-bold text-lg uppercase text-gray-900 dark:text-dark-text mt-4">
                  10.3 Maximum Liability
                </p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEIGHBOREATS' TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM YOUR 
                  USE OF THE PLATFORM SHALL NOT EXCEED THE GREATER OF (A) $100 OR (B) THE AMOUNT OF FEES YOU PAID TO US 
                  IN THE SIX MONTHS PRECEDING THE CLAIM.
                </p>
              </div>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">11. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless NeighborEats and its officers, directors, employees, and 
                agents from any claims, damages, losses, liabilities, and expenses (including attorney fees) arising from:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Your use of the platform</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any laws or regulations</li>
                <li>Your violation of any third-party rights</li>
                <li>Any food you prepare or deliver (for chefs/drivers)</li>
                <li>Any interactions between you and other users</li>
              </ul>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">12. Dispute Resolution</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">12.1 User-to-User Disputes</h3>
              <p className="mb-4">
                <strong>Disputes between customers and chefs/drivers must be resolved directly between the parties.</strong> 
                NeighborEats is not responsible for mediating or resolving these disputes but may provide contact information 
                to facilitate communication.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text mb-3">12.2 Disputes with NeighborEats</h3>
              <p>
                Any disputes with NeighborEats shall be resolved through binding arbitration in accordance with the rules of 
                the American Arbitration Association. You waive your right to participate in class action lawsuits against NeighborEats.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">13. Termination</h2>
              <p className="mb-4">
                We may suspend or terminate your account at any time, with or without notice, for any reason, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Multiple customer complaints</li>
                <li>Failed background checks (for chefs/drivers)</li>
                <li>Lack of required licenses or permits</li>
              </ul>
              <p className="mt-4">
                Upon termination, your right to use the platform will immediately cease. We are not liable for any losses 
                resulting from account suspension or termination.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">14. Intellectual Property</h2>
              <p className="mb-4">
                All content on NeighborEats, including logos, designs, text, graphics, and software, is owned by or licensed 
                to NeighborEats and is protected by copyright and trademark laws. You may not use our intellectual property 
                without written permission.
              </p>
              <p>
                By uploading content to our platform (photos, reviews, etc.), you grant us a non-exclusive, worldwide, 
                royalty-free license to use, display, and distribute your content in connection with our services.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">15. Changes to These Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting 
                the updated Terms on our platform and updating the "Last Updated" date. Your continued use of NeighborEats 
                after changes are posted constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">16. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, 
                without regard to its conflict of law principles.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">17. Contact Us</h2>
              <p className="mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-dark-bg p-4 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-dark-text">NeighborEats</p>
                <p>Email: <a href="mailto:legal@neighboreats.com" className="text-brand-teal hover:underline">legal@neighboreats.com</a></p>
                <p>Support: <a href="mailto:support@neighboreats.com" className="text-brand-teal hover:underline">support@neighboreats.com</a></p>
              </div>
            </section>

            {/* Final Agreement */}
            <section className="border-t border-gray-200 dark:border-dark-border pt-6">
              <p className="font-semibold text-gray-900 dark:text-dark-text mb-2">
                By using NeighborEats, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <p className="text-sm text-gray-600 dark:text-dark-text-muted italic">
                Last Updated: December 14, 2025
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
