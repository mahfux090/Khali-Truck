"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Truck, Package, ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Connect Trucks with SMEs Across Bangladesh",
    description:
      "Find available trucks or post your trip. Simple, fast, and reliable logistics platform for Bangladesh.",
    primaryCTA: { text: "Find Trucks", href: "/find-trucks", icon: Package },
    secondaryCTA: { text: "Post a Trip", href: "/post-trip", icon: Truck },
    gradient: "from-blue-600/10 via-background to-background",
    backgroundImage:
      "https://i.postimg.cc/Qt3xhghP/home-page.png",
  },
  {
    id: 2,
    title: "Fast & Reliable Truck Booking",
    description:
      "Book trucks instantly with verified owners. Track your shipments and manage everything from one dashboard.",
    primaryCTA: { text: "Browse Trucks", href: "/find-trucks", icon: Truck },
    secondaryCTA: { text: "Start Earning", href: "/post-trip", icon: Package },
    gradient: "from-orange-600/10 via-background to-background",
    backgroundImage:
      "https://i.postimg.cc/c4CPzKfL/FAST.png",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(timer)
  }, [currentSlide])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[500px] md:h-[600px]">
        {slides.map((slide, index) => {
          const PrimaryIcon = slide.primaryCTA.icon
          const SecondaryIcon = slide.secondaryCTA.icon

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center justify-center px-4 py-12 text-center transition-all duration-500 ${
                index === currentSlide
                  ? "translate-x-0 opacity-100"
                  : index < currentSlide
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${slide.backgroundImage}')`,
                }}
              />
              

              <div className="relative z-10 mx-auto max-w-3xl space-y-6">
                <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-pretty text-lg text-white/90 md:text-xl drop-shadow-md">{slide.description}</p>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center">
                  <Link href={slide.primaryCTA.href} className="w-full sm:w-auto">
                    <Button
  size="lg"
  className="group w-full sm:w-auto gap-2 text-lg 
             bg-black text-white 
             hover:bg-black/90 
             transition-all hover:scale-105 hover:shadow-lg"
>

                      <PrimaryIcon className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      {slide.primaryCTA.text}
                    </Button>
                  </Link>
                  <Link href={slide.secondaryCTA.href} className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="group w-full gap-2 bg-white/20 text-white border-white/30 text-lg transition-all hover:scale-105 hover:shadow-lg hover:bg-white/30 sm:w-auto" >

                      <SecondaryIcon className="h-5 w-5 transition-transform group-hover:-rotate-12" />
                      {slide.secondaryCTA.text}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-background hover:scale-110 disabled:opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
  ? "w-8 bg-black"
  : "w-2 bg-black/40 hover:bg-black/60"

            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
