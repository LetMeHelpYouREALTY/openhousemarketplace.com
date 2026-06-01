import { Metadata } from "next"
import { BASE_URL } from "@/lib/metadata-utils"

import StructuredData from "@/components/StructuredData"
import { GBP } from "@/config/gbp"

const BUSINESS_ADDRESS = `${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}`

export const revalidate = 2592000 // ISR: revalidate every 30 days (legal)

export const metadata: Metadata = {
  title: "Privacy Policy | Open House Market Place",
  description:
    "Privacy Policy for Open House Market Place. Learn how we collect, use, and protect your personal information.",
  robots: "noindex, follow",
  alternates: {
    canonical: `${BASE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | Open House Market Place",
    description:
      "Privacy Policy for Open House Market Place. Learn how we collect, use, and protect your personal information.",
    url: `${BASE_URL}/privacy-policy`,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: "Home", url: `${BASE_URL}/` },
            { name: "Privacy Policy", url: `${BASE_URL}/privacy-policy` },
          ],
        }}
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mb-4 text-gray-600">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <section>
                <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">1. Introduction</h2>
                <p>
                  Open House Market Place ("we," "our," or "us") is committed to protecting your privacy. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                  website.
                </p>
              </section>

              <section>
                <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">2. Information We Collect</h2>
                <p>We may collect information about you in various ways:</p>
                <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-900">Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Fill out a contact form</li>
                  <li>Register for property alerts</li>
                  <li>Schedule a property tour</li>
                  <li>Subscribe to our newsletter</li>
                </ul>
                <p className="mt-4">This information may include:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Property preferences and search criteria</li>
                  <li>Real estate goals and timeline</li>
                  <li>Any other information you choose to provide</li>
                </ul>

                <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-900">Automatically Collected Information</h3>
                <p>We automatically collect certain information when you visit our website, including:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>IP address and browser type</li>
                  <li>Pages you visit and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Device information</li>
                </ul>
              </section>

              <section>
                <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Send you property listings and market updates</li>
                  <li>Personalize your experience on our website</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">4. Information Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information in the following circumstances:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist in our operations</li>
                </ul>
              </section>

              <section>
                <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information.
                  However, no method of transmission over the Internet or electronic storage is 100% secure, and we
                  cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">7. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and store certain
                  information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                  sent.
                </p>
              </section>

              <section>
                <h2 className="mt-8 mb-4 text-2xl font-bold text-gray-900">8. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <p>
                  <strong>Email:</strong> privacy@openhousemarketplace.com
                  <br />
                  <strong>Phone:</strong> {GBP.phone}
                  <br />
                  <strong>Address:</strong> {BUSINESS_ADDRESS}
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
