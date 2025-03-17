"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Trash2 } from "lucide-react"
import Link from "next/link"

export default function RomanticMessage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ id: number; text: string; date: Date }[]>([
    {
      id: 1,
      text: "Every moment with you feels like a dream I never want to wake up from. You are my sunshine on cloudy days.",
      date: new Date(),
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setMessages([...messages, { id: Date.now(), text: message, date: new Date() }])
    setMessage("")
  }

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id))
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => (
          <Card key={msg.id} className="border-pink-200 bg-pink-50">
            <CardContent className="p-3">
              <div className="flex justify-between">
                <p className="text-xs text-pink-400">
                  {msg.date.toLocaleDateString()}{" "}
                  {msg.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                <button onClick={() => deleteMessage(msg.id)} className="text-pink-300 hover:text-pink-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-pink-700">{msg.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <Textarea
          placeholder="Reply his message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px] border-pink-300 focus-visible:ring-pink-500"
        />
        <div className="flex gap-4">
          <div className="mt-2 flex justify-end">
            <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=rakha.davinalamsyah@gmail.com&su=Bahasa Cinta&body=${message}`}  >
            
              <Button type="submit" className="bg-pink-500 text-white hover:bg-pink-600">
                <Send className="mr-2 h-4 w-4" />
                Reply by Gmail
              </Button>
            </Link>
          </div>
        </div>
       
      </form>
    </div>
  )
}

