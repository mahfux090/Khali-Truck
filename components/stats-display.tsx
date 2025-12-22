"use client"

import { Users, Truck, TrendingUp } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useCounterAnimation } from "@/hooks/use-counter-animation"

const iconMap = {
  Users,
  Truck,
  TrendingUp,
}

type StatItem = {
  label: string
  value: number
  icon: keyof typeof iconMap
}

export function StatsDisplay({ stats }: { stats: StatItem[] }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 })

  return (
    <section ref={ref} className="border-b bg-muted/50 px-4 py-8">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={iconMap[stat.icon]}
              value={stat.value}
              label={stat.label}
              isIntersecting={isIntersecting}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
  isIntersecting,
  delay,
}: {
  icon: any
  value: number
  label: string
  isIntersecting: boolean
  delay: number
}) {
  const count = useCounterAnimation(value, 2000, isIntersecting)

  return (
    <div
      className="flex flex-col items-center text-center transition-all duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Icon className="mb-2 h-6 w-6 animate-bounce-subtle text-primary md:h-8 md:w-8" />
      <div className="text-2xl font-bold md:text-4xl">{count}</div>
      <div className="text-xs text-muted-foreground md:text-sm">{label}</div>
    </div>
  )
}
