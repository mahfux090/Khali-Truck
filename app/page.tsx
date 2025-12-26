import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturesBanner } from "@/components/features-banner"
import { PromoBanner } from "@/components/promo-banner"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <HeroCarousel />

        {/* Stats */}
        <StatsSection />

        {/* Features Banner (Orange BG already) */}
        <FeaturesBanner />

        {/* How It Works */}
        <section className="border-t bg-white px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <h3 className="mb-12 text-center text-3xl font-bold text-black">
              How It Works
            </h3>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="animate-fade-in-up animation-delay-100 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-lg transition-shadow hover:shadow-xl">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="mb-2 text-xl font-semibold text-black">
                  Sign Up
                </h4>
                <p className="text-black/70">
                  Create your account as a shipper or truck owner in minutes
                </p>
              </div>

              {/* Step 2 */}
              <div className="animate-fade-in-up animation-delay-300 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-lg transition-shadow hover:shadow-xl">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="mb-2 text-xl font-semibold text-black">
                  Post or Search
                </h4>
                <p className="text-black/70">
                  Post your available truck or search for trucks that match your needs
                </p>
              </div>

              {/* Step 3 */}
              <div className="animate-fade-in-up animation-delay-500 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-lg transition-shadow hover:shadow-xl">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="mb-2 text-xl font-semibold text-black">
                  Connect & Ship
                </h4>
                <p className="text-black/70">
                  Connect directly and complete your logistics needs efficiently
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Banner (Orange BG) */}
        <PromoBanner />

        {/* Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
