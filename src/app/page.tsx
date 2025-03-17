'use client'
import RomanticMessage from "@/components/romantic-message"
import FloatingHearts from "@/components/floating-hearts"
import SpotifyPlayer from "@/components/spotify-player"
import { useEffect, useState } from "react"
import anomali from '@/assets/anomali1.jpg'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { redirect } from "next/navigation"
// import { redirect } from "next/navigation"


export default function Home() {
  const [memories, setMemories] = useState(["anomali"])
  useEffect(() => {setMemories(["anomali"])}, [])
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200">
       <Button
      variant="default"
      size="lg"
        className={`fixed bottom-6 right-6 shadow-lg rounded-full `}
    >
        <ArrowLeft className="mr-2" />
        
      Back
    </Button>

      <FloatingHearts />
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-pink-600 md:text-6xl">Hai, Putri Sonia</h1>
          <p className="mt-4 text-lg text-pink-500">There is always another place to find your own stars</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-pink-600">Our Playlist</h2>
            <SpotifyPlayer />
          </div>

          <div className="rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-pink-600">Love Notes</h2>
            <RomanticMessage />
          </div>
        </div>

        <div className="mt-12 rounded-xl bg-white/80 p-6 shadow-lg backdrop-blur-sm">
  <h2 className=" font-serif text-2xl font-semibold text-pink-600 text-center">
    Our Gallery
          </h2>
          <p className="mb-4 font-serif text-md font-light text-pink-600 text-center">  Lets Create Another Beautiful Memories Again !</p>

  {memories.length > 0 ? (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      
      {memories.map((i) => (
        <div key={i} className="overflow-hidden rounded-lg">
          <Image
            src={anomali}
            alt={`Memory ${i}`}
            width={200}
            height={200}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  ) : (
      <p className="mt-6 text-center text-lg font-medium text-gray-600">
      Lets Create Another Beautiful Memories Again !
    </p>
  )}
</div>

      </div>

      <footer className="mt-16 bg-pink-300/50 py-6 text-center text-pink-700">
        <p className="font-serif">Made with ❤️ of Dave  (in 5 hours non stop) for you</p>
      </footer>
    </main>
  )
}

