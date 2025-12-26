"use client"

import Image from "next/image"

export function PromoBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-4 py-24 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl"></div>
      </div>

      <div className="container relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left side - Text content */}
          <div className="animate-fade-in-up space-y-6">
            <h2 className="text-4xl font-bold text-white md:text-5xl">Join Thousands of Logistics Professionals</h2>
            <p className="text-lg text-white/90">
              Experience the fastest, most reliable way to connect truck owners with shippers across Bangladesh. Grow
              your business today.
            </p>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button className="rounded-lg bg-white px-8 py-3 font-semibold text-primary transition-all hover:shadow-lg hover:scale-105">
                Get Started Now
              </button>
              <button className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>

          {/* Right side - Database Schema Image */}
          <div className="animate-fade-in-up animation-delay-200 flex items-center justify-center">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-12-26%20121435-I7ZX9DTVpodn8t65TNs5C2T6uq2o1E.png"
                alt="Khali Truck Database Schema - Bookings, Trips, and Trucks information"
                width={600}
                height={400}
                className="w-full h-auto object-cover text-justify leading-7"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
