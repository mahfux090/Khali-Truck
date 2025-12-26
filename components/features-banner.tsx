"use client"

import { ArrowRight, Truck, Users, Shield } from "lucide-react"

export function FeaturesBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 px-4 py-24 md:py-32">

      <div className="container mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Why Choose Khali Truck?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Join thousands of drivers and businesses trusting us to deliver their logistics solutions safely,
              reliably, and efficiently.
            </p>

            <a
              href="/find-trucks"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition-all hover:gap-3 hover:shadow-lg"
            >
              Explore Opportunities
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            <div className="animate-fade-in-up animation-delay-100 rounded-lg bg-white/15 p-6 backdrop-blur-sm transition-transform hover:scale-105">
              <Truck className="mb-3 h-8 w-8 text-white" />
              <h3 className="mb-2 font-semibold">Wide Network</h3>
              <p className="text-sm text-white/90">
                Access thousands of verified trucks and routes across Bangladesh
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-200 rounded-lg bg-white/15 p-6 backdrop-blur-sm transition-transform hover:scale-105">
              <Shield className="mb-3 h-8 w-8 text-white" />
              <h3 className="mb-2 font-semibold">Secure & Verified</h3>
              <p className="text-sm text-white/90">
                All drivers and businesses are verified for your peace of mind
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-300 rounded-lg bg-white/15 p-6 backdrop-blur-sm transition-transform hover:scale-105">
              <Users className="mb-3 h-8 w-8 text-white" />
              <h3 className="mb-2 font-semibold">24/7 Support</h3>
              <p className="text-sm text-white/90">
                Our dedicated support team is always here to help
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-400 rounded-lg bg-white/15 p-6 backdrop-blur-sm transition-transform hover:scale-105">
              <ArrowRight className="mb-3 h-8 w-8 text-white" />
              <h3 className="mb-2 font-semibold">Quick & Easy</h3>
              <p className="text-sm text-white/90">
                Book and manage shipments in just a few clicks
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
