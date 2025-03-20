"use client"

import { useState } from "react"
import { randomBytes } from "crypto"

import { Button } from "@/components/ui/button"
import { createLiveResponse } from "@/lib/actions/live-responses"

export default function LiveResponseCreation() {
  const [text, setText] = useState("")

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center bg-white p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing here..."
        className="w-[80%] min-h-[60vh] p-4 text-6xl font-mono font-extrabold border-none outline-none resize-none bg-white"
        style={{
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
        autoFocus
      />

      <Button variant="outline" className="text-xl" onClick={
        async () => {
          console.log(text)
          const uniqueLink = randomBytes(16).toString("hex")
          console.log(uniqueLink.length)
          await createLiveResponse({ uniqueLink, text })

          window.location.href = `/live-responses/${uniqueLink}/view`
        }
      }>Generate</Button>
    </div>
  )
}

