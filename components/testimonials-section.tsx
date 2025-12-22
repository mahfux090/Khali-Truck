"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const testimonials = [
  {
    name: "আব্দুল করিম",
    role: "ট্রাক মালিক",
    location: "ঢাকা",
    rating: 5,
    comment: "খালি ট্রাক ব্যবহার করে আমি সহজেই মাল পরিবহনের কাজ পাই। খুবই সহজ এবং দ্রুত সেবা।",
  },
  {
    name: "রহিম উদ্দিন",
    role: "ব্যবসায়ী",
    location: "চট্টগ্রাম",
    rating: 5,
    comment: "আমার পণ্য পরিবহনের জন্য সঠিক ট্রাক খুঁজে পেতে এই প্ল্যাটফর্ম অনেক সাহায্য করেছে।",
  },
  {
    name: "সালমা বেগম",
    role: "শিপার",
    location: "সিলেট",
    rating: 5,
    comment: "নির্ভরযোগ্য এবং সাশ্রয়ী মূল্যে ট্রাক পাওয়া যায়। সবাইকে সুপারিশ করি।",
  },
]

export function TestimonialsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section ref={ref} className="border-t bg-background px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <h3 className="mb-12 text-center text-3xl font-bold">What Our Users Say</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                isIntersecting ? "animate-slide-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary transition-transform hover:scale-125" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{testimonial.comment}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
