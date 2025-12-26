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
        <HeroCarousel />

        <StatsSection />

        <FeaturesBanner />

        {/* Features Section */}
        <section className="border-t bg-background px-4 py-16">
          <div className="container mx-auto max-w-5xl">
            <h3 className="mb-12 text-center text-3xl font-bold">How It Works</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="animate-fade-in-up animation-delay-100 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow hover:shadow-xl">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="mb-2 text-xl font-semibold">Sign Up</h4>
                <p className="text-muted-foreground">Create your account as a shipper or truck owner in minutes</p>
              </div>
              <div className="animate-fade-in-up animation-delay-300 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow hover:shadow-xl">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="mb-2 text-xl font-semibold">Post or Search</h4>
                <p className="text-muted-foreground">
                  Post your available truck or search for trucks that match your needs
                </p>
              </div>
              <div className="animate-fade-in-up animation-delay-500 flex flex-col items-center text-center transition-transform hover:scale-105">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow hover:shadow-xl">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="mb-2 text-xl font-semibold">Connect & Ship</h4>
                <p className="text-muted-foreground">Connect directly and complete your logistics needs efficiently</p>
              </div>
            </div>
          </div>
        </section>

        <PromoBanner />

        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  )
}
