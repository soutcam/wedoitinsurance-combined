import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">WEDOIT Insurance</h3>
            <p className="text-sm leading-relaxed">
              Independent insurance broker helping families and professionals protect what matters most.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:text-white transition-colors">About</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-white transition-colors">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="hover:text-white transition-colors">Resources</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-white transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+15752663119" className="hover:text-white transition-colors">
                  (575) 266-3119
                </a>
              </li>
              <li>
                <a href="mailto:info@wedoitinsurance.com" className="hover:text-white transition-colors">
                  info@wedoitinsurance.com
                </a>
              </li>
              <li>Carlsbad, NM 88220</li>
              <li>Mon-Fri, 9am-5pm MT</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources">
                  <a className="hover:text-white transition-colors">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="hover:text-white transition-colors">Podcast</a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="hover:text-white transition-colors">Videos</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <a className="hover:text-white transition-colors">Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          {/* Important Disclosures */}
          <div className="bg-slate-800 p-6 rounded-lg mb-8">
            <h4 className="text-white font-semibold mb-3">Important Disclosures</h4>
            <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
              <p>
                <span className="font-semibold text-slate-300">Company:</span> WEDOIT Insurance LLC is an independent insurance broker, not an insurance company.
              </p>
              <p>
                <span className="font-semibold text-slate-300">Service Area:</span> We serve clients in all 50 states. Product availability varies by state and carrier.
              </p>
              <p>
                <span className="font-semibold text-slate-300">Underwriting:</span> All applications are subject to underwriting approval by the insurance carrier.
              </p>
              <p>
                <span className="font-semibold text-slate-300">Licensing:</span> Our advisors are licensed to sell life insurance in all 50 states. License information is available upon request.
              </p>
              <p>
                <span className="font-semibold text-slate-300">Privacy:</span> Your information is used only to contact you about insurance options and is not sold.
              </p>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              &copy; {currentYear} WEDOIT Insurance LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy">
                <a className="hover:text-slate-300 transition-colors">Privacy Policy</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
