"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Music } from "lucide-react"

export default function SpotifyPlayer() {
  const [playlistUrl, setPlaylistUrl] = useState("")
  const [currentPlaylist, setCurrentPlaylist] = useState("")

  // Extract Spotify playlist ID from URL
  const getEmbedUrl = (url: string) => {
    if (!url) return ""

    // Handle different Spotify URL formats
    let playlistId = ""
    if (url.includes("playlist/")) {
      playlistId = url.split("playlist/")[1]?.split("?")[0]
    } else if (url.includes("track/")) {
      playlistId = url.split("track/")[1]?.split("?")[0]
    }

    if (!playlistId) return ""

    const type = url.includes("playlist/") ? "playlist" : "track"
    return `https://open.spotify.com/embed/${type}/${playlistId}?utm_source=generator`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPlaylist(getEmbedUrl(playlistUrl))
  }

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Put Spotify Playlist Name Of Us Here"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            className="border-pink-300 focus-visible:ring-pink-500"
          />
          <Button type="submit" className="bg-pink-500 text-white hover:bg-pink-600">
            <Music className="mr-2 h-4 w-4" />
            Play
          </Button>
        </div>
      </form>

      {currentPlaylist ? (
        <iframe
          src={currentPlaylist}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg"
        ></iframe>
      ) : (
        <div className="flex h-[352px] flex-col items-center justify-center rounded-lg border border-dashed border-pink-300 bg-pink-50 p-4 text-center">
       <iframe  src="https://open.spotify.com/embed/track/4K2TmH3Luk6dF8dVEmq6m0?utm_source=generator" width="100%" height="352" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          variant="outline"
          className="border-pink-300 text-pink-600 hover:bg-pink-100"
          onClick={() => {
            setCurrentPlaylist("https://open.spotify.com/embed/playlist/37i9dQZF1DX7rOY2tZUw1k?utm_source=generator")
          }}
        >
          <Heart className="mr-2 h-4 w-4" />
          Load Romantic Playlist
        </Button>
      </div>
    </div>
  )
}

