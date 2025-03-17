"use client"

import { useEffect, useState } from "react"

type Heart = {
  id: number
  x: number
  size: number
  opacity: number
  speed: number
  delay: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => createHeart(i))
    setHearts(initialHearts)

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts((prev) => {
        // Remove hearts that have gone off screen
        const filtered = prev.filter((heart) => heart.delay < 20)
        // Add a new heart
        return [...filtered, createHeart(Date.now())]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Animate hearts
    const animationFrame = requestAnimationFrame(animateHearts)
    return () => cancelAnimationFrame(animationFrame)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createHeart = (id: number): Heart => ({
    id,
    x: Math.random() * 100, // random horizontal position (0-100%)
    size: Math.random() * 20 + 10, // random size (10-30px)
    opacity: Math.random() * 0.5 + 0.3, // random opacity (0.3-0.8)
    speed: Math.random() * 0.5 + 0.5, // random speed (0.5-1)
    delay: 0, // initial delay
  })

  const animateHearts = () => {
    setHearts((prev) =>
      prev.map((heart) => ({
        ...heart,
        delay: heart.delay + heart.speed * 0.01,
      })),
    )
    requestAnimationFrame(animateHearts)
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: `${-10 + heart.delay * 100}%`, // start below screen and move up
            opacity: heart.opacity - heart.delay * 0.04, // fade out as it rises
            transition: "bottom 0.1s linear",
            zIndex: 0,
          }}
        >
          <div
            className="text-pink-400"
            style={{
              fontSize: `${heart.size}px`,
              transform: `rotate(${Math.sin(heart.delay) * 20}deg)`, // gentle swaying
            }}
          >
            ❤️
          </div>
        </div>
      ))}
    </div>
  )
}

