import Link from "next/link"
import { Truck, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-6 w-6 text-black" />
              <span className="text-lg font-bold text-black">Khali Truck</span>
            </div>
            <p className="text-sm text-black/70">
              Connecting Bangladesh&apos;s logistics network. Find trucks or post trips with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-black">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/find-trucks" className="text-black/70 hover:text-black">
                  Find Trucks
                </Link>
              </li>
              <li>
                <Link href="/post-trip" className="text-black/70 hover:text-black">
                  Post a Trip
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-black/70 hover:text-black">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-up" className="text-black/70 hover:text-black">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold text-black">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-black/70 hover:text-black">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black/70 hover:text-black">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black/70 hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black/70 hover:text-black">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-semibold text-black">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-black/70" />
                <span className="text-black/70">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-black/70" />
                <span className="text-black/70">+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-black/70" />
                <span className="text-black/70">info@khalitruck.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-black/60">
          <p>
            &copy; 2025 Khali Truck. All rights reserved. Connecting Bangladesh&apos;s logistics network.
          </p>
        </div>
      </div>
    </footer>
  )
}
