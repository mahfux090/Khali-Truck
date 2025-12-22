"use client"

import { useEffect, useState } from "react"

export function useCounterAnimation(end: number, duration = 2000, isIntersecting = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isIntersecting) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * (end - startValue) + startValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isIntersecting])

  return count
}
