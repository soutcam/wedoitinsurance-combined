export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-slate-200">
            Last updated: May 16, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-sm max-w-none space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-slate-700 leading-relaxed">
                WEDOIT Insurance LLC ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Submit a quote request form</li>
                <li>Submit a contact form</li>
                <li>Schedule a policy review</li>
                <li>Communicate with us via email or phone</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-3">
                This information may include your name, email address, phone number, state, coverage preferences, and any other information you choose to provide.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Respond to your inquiries and requests</li>
                <li>Provide you with insurance quotes and information</li>
                <li>Contact you about your quote or policy review</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-slate-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with insurance carriers to provide you with quotes and coverage options. All third parties are required to maintain the confidentiality of your information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-slate-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-3">
                To exercise these rights, please contact us at info@wedoitinsurance.com or (575) 266-3119.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-slate-700 leading-relaxed">
                Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
              <p className="text-slate-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of external sites. Please review their privacy policies before providing any personal information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-slate-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-slate-50 p-4 rounded-lg text-slate-700">
                <p><strong>WEDOIT Insurance LLC</strong></p>
                <p>Carlsbad, NM 88220</p>
                <p>Phone: (575) 266-3119</p>
                <p>Email: info@wedoitinsurance.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
